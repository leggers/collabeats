////////////////////////////////////////////////////////////////////////////////
// Startup

Meteor.startup(function () {
  Deps.autorun(function () {
    var roomName = Session.get('roomName') || "home";
    Session.set('roomName', roomName);
    Meteor.subscribe('rooms', roomName, function () {
      var room = Rooms.findOne({name: Session.get('roomName')});
      tempo = room.tempo;
      var channelIds = room.channelIds;
      Session.set('channels', channelIds);
      Meteor.subscribe('channels', room._id, function () {
        Meteor.subscribe('steps', channelIds);
      });
    });
  });
  Session.set('looping', false);
});



////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.room = function () {
  return Rooms.findOne({name: Session.get('roomName')});
};

var loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function(){
      loopFunc((tickCount+= 1) % 16);
    }, getInterval());
  }
};

var tempo;

var getInterval = function() {
  return 60/tempo*1000/4;
};

Template.room.events({
  'click button#play': function(event) {
    if (Session.get('looping')) {
      Session.set('looping', false);
      $('.glyphicon-stop').hide();
      $('.glyphicon-play').show();
    }
    else {
      Session.set('looping', true);
      loopFunc(0);
      $('.glyphicon-play').hide();
      $('.glyphicon-stop').show();
    }
  },
  'change input#tempo': function(event) {
    tempo = event.currentTarget.value;
    Meteor.call('changeRoomTempo', this._id, event.currentTarget.value);
  },
  'click #clear': function (event) {
    Steps.find().forEach(function (step) {
      Meteor.call('toggleStep', step._id, false);
    });
  }
});



////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find({_id: {$in: Session.get('channels')}});
};

Template.channels.created = function () {
  // Cache the channel-step arrays as a single object for sound loop
  Session.rhythm = {};
  amplify.subscribe('tick', function (tickCount) {
    var rhythm = Session.rhythm;
    var channelIds = Object.keys(rhythm);
    for (var i = channelIds.length - 1; i >= 0; i--) {
      channelId = channelIds[i];
      if (rhythm[channelId][tickCount]) {
        Session.sounds[channelId].play();
      }
    }
  });
};

Template.channels.rendered = function () {
  sounds = Session.sounds || {};
  Session.sounds = sounds;
  Channels.find({roomId: Rooms.findOne({name: Session.get('roomName')})._id})
    .forEach(function (channel) {
      sounds[channel._id] = Session.sounds[channel._id] || new Howl({
        urls: [channel.soundUrl],
        onload: function() {console.log('loaded ' + channel.soundUrl);},
        onloaderror: function() {console.log('error loading ' + channel.soundUrl);},
      });
  });
  Session.sounds = sounds;
};

Template.channels.events({
  'click .step': function (event, template) {
    Meteor.call('toggleStep', this._id, !this.active);
    Session.sounds[this.channelId].play();
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