////////////////////////////////////////////////////////////////////////////////
// Startup & Layout

Meteor.startup(function () {
  Deps.autorun(function () {
    Meteor.subscribe('sounds');
    console.log('deps');
    var roomName = Session.get('roomName') || "home";
    Session.set('roomName', roomName);
    Meteor.subscribe('rooms', roomName, function () {
      var room = Rooms.findOne({name: Session.get('roomName')});
      tempo = room.tempo;
      Session.set('roomId', room._id);
      var channelIds = room.channelIds;
      Session.set('channels', channelIds);
      Meteor.subscribe('channels', room._id, function () {
        Meteor.subscribe('steps', channelIds);
      });
    });
  });
  Session.set('looping', false);
});

Template.layout.render = function () {
  return Session.get('channels') && Session.get('roomId');
};


////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.created = function () {
  var win = $(window);
  win.load(function () {
    win.scroll(function (event) {
      var controlBar = $('.fixed-wrap');
      if (win.scrollTop() >= 70){
        controlBar.addClass('fixed');
      }
      else {
        controlBar.removeClass('fixed');
      }
    });
  });
};

Template.room.room = function () {
  return Rooms.findOne({name: Session.get('roomName')});
};

var loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function() {
      loopFunc((tickCount+= 1) % 16);
    }, getInterval());
  }
};

var getInterval = function() {
  return 60/Rooms.findOne({name: Session.get('roomName')}).tempo*1000/4;
};

Template.room.events({
  'click button#play': function(event) {
    if (Session.get('looping')) {
      Session.set('looping', false);
      $('.loop-indicator').hide();
    }
    else {
      Session.set('looping', true);
      loopFunc(0);
      $('.loop-indicator').show();
    }
  },
  'click #clear': function (event) {
    Steps.find().forEach(function (step) {
      Meteor.call('toggleStep', step._id, false);
    });
  },
  'click #slower': function (event) {
    Meteor.call('deltaRoomTempo', this._id, -5);
  },
  'click #faster': function (event) {
    Meteor.call('deltaRoomTempo', this._id, 5);
  },
  'change #sound-on-change': function (event) {
    Session.set('sound-on-change', event.target.checked);
  }
});

Template.room.rendered = function () {
  console.log('room rendered');
  if (Session.get('sound-on-change') && !$('#sound-on-change').is(':checked')) {
    $('#sound-on-change').click();
  }
};

Template.room.looping = function () {
  return Session.get('looping');
};



////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find({_id: {$in: Session.get('channels')}});
};

Template.channels.variants = function () {
  return Sounds.findOne({name: this.soundName}).variants;
};

Template.channels.created = function () {
  // Cache the channel-step arrays as a single object for sound loop
  Session.rhythm = {};
  amplify.subscribe('tick', function (tickCount) {
    var rhythm = Session.rhythm;
    var channelIds = Object.keys(rhythm);
    for (var i = channelIds.length - 1; i >= 0; i--) {
      var channelId = channelIds[i];
      if (rhythm[channelId][tickCount]) {
        Session.sounds[channelId].play();
      }
    }
    var left = ($(window).width() - $('#top-div').width()) / 2 + 205 + 55 * tickCount;
    $('.loop-indicator').css('left', left);
  });
};

Template.channels.rendered = function () {
  console.log('channel rendered');
  var sounds = Session.sounds || {};
  Session.sounds = sounds;
  var variants = Session.variants || {};
  Session.variants = variants;
  Channels.find({roomId: Session.get('roomId')})
    .forEach(function (channel) {
      var sound = Sounds.findOne({name: channel.soundName});
      var url = sound.variants[channel.selectedSound - 1].url;
      sounds[channel._id] = Session.sounds[channel._id] || new Howl({
        urls: [url],
        onloaderror: function() {console.log('error loading ' + url);},
        volume: channel.volume
      });
      variants[url] = Session.variants[url] || new Howl({
        urls: [url],
        volume: 1,
        onloaderror: function () {console.log('error loading ' + url);},
      });
      sounds[channel._id]._volume = channel.volume;
  });
  Session.sounds = sounds;
  $('.loop-indicator').css('height', 55 * Session.get('channels').length - 5);
};

Template.channels.events({
  'click .step': function (event, template) {
    Meteor.call('toggleStep', this._id, !this.active);
  },
  'mousedown .step': function (event, template) {
    Session.set('mousedown', true);
    Session.set('insideStep', this._id);
    Meteor.call('toggleStep', this._id, !this.active);
    if (Session.get('sound-on-change')) Session.sounds[this.channelId].play();
  },
  'mouseup': function () {
    Session.set('mousedown', false);
    Session.set('insideStep', undefined);
  },
  'click .clear-row': function (event, template) {
    for (var i = this.stepIds.length - 1; i >= 0; i--) {
      Meteor.call('toggleStep', this.stepIds[i], false);
    }
  },
  'click .glyphicon-volume-down': function (event, template) {
    Meteor.call('changeChannelVolume', this._id, -0.1);
  },
  'click .glyphicon-volume-up': function (event, template) {
    Meteor.call('changeChannelVolume', this._id, 0.1);
  },
  'click .glyphicon-volume-off': function (event, template) {
    Meteor.call('changeChannelVolume', this._id, -this.volume || 0.5);
  },
  'click #variant-menu > li > a > .glyphicon': function (event, template) {
    event.stopPropagation();
    var url = event.srcElement.parentElement.dataset.url;
    var existingSound = Session.variants[url];
    if (existingSound) {
      existingSound.play();
    }
    else {
      Session.variants[url] = new Howl({
        urls: [url],
        volume: 1,
        autoplay: true
      });
    }
  },
  'click #variant-menu > li > a': function (event, template) {
    console.log('dropdown clicked');
  }
});



////////////////////////////////////////////////////////////////////////////////
// Steps

Template.step.getStep = function (stepId) {
  return Steps.findOne({_id: stepId});
};

Template.step.rendered = function () {
  step = Steps.findOne({_id: this.data});
  if (step) {
    Session.rhythm[step.channelId] = Session.rhythm[step.channelId] || [];
    Session.rhythm[step.channelId][step.position] = step.active;
  }
};

Template.step.events({
  'mouseenter .step': function (event, template) {
    if (Session.get('mousedown') && this._id !== Session.get('insideStep')) {
      Session.set('insideStep', this._id);
      Meteor.call('toggleStep', this._id, !this.active);
      if (Session.get('sound-on-change')) Session.sounds[this.channelId].play();
    }
  },
  'mouseleave .step': function (event, template) {
    Session.set('insideStep', undefined);
  }
});