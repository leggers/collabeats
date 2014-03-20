////////////////////////////////////////////////////////////////////////////////
// Startup & Layout

Meteor.startup(function () {
  Meteor.subscribe('sounds', function () {

    // Room initialization
    Deps.autorun(function () {
      _rhythm = {}; // cache to prevent database lookups each tick
      _sounds = {}; // mapping of channel ids to their respective sounds
      _variants = {}; // stores variants of sounds as a mapping of sound urls to their sounds

      var room = Session.get('room') || "home";
      Session.set('room', room);
      Meteor.subscribe('rooms', room, function () {
        var room = Rooms.findOne({name: Session.get('room')});
        tempo = room.tempo;
        Session.set('roomId', room._id);

        var channelIds = room.channelIds;
        Session.set('channels', channelIds);
        Meteor.subscribe('channels', room._id, function () {

          Meteor.subscribe('steps', channelIds, function () {

            for (var i = channelIds.length - 1; i >= 0; i--) {
              var channelId = channelIds[i];

              var channel = Channels.findOne(channelId);
              var sound = Sounds.findOne({name: channel.soundName});
              var url = sound.variants[channel.selectedSound - 1].url;

              _sounds[channelId] = newSound(url, channel.volume);
              _variants[url] = newSound(url, 1);

              // Initial setup of rhythm
              _rhythm[channelId] = [];
            }

            // Rhythm maintainance
            stepObserver = Steps.find({active: true}).observe({
              added: function (step) {
                _rhythm[step.channelId][step.position] = true;
              },
              removed: function (step) {
                _rhythm[step.channelId][step.position] = false;
              }
            });
          });

          // Sample and volume maintainance
          channelObserver = Channels.find({_id: {$in: Session.get('channels')}})
            .observeChanges({
              changed: function (id, fields) {
                if (fields.volume !== undefined) {
                  _sounds[id]._volume = fields.volume;
                }
                if (fields.selectedSound) {
                  var channel = Channels.findOne(id);
                  var sound = Sounds.findOne({name: channel.soundName});
                  var url = sound.variants[channel.selectedSound - 1].url;
                  
                  var existingSound = _variants[url];
                  if (existingSound) {
                    var replacementSound = jQuery.extend({}, existingSound);
                    replacementSound._volume = channel.volume;
                    _sounds[id] = replacementSound;
                  }
                  else {
                    newSound(url, channel.volume, false, function () {
                      _sounds[id] = this;
                    });
                    newSound(url, 1, false, function () {
                      _variants[url] = this;
                    });
                  }
                }
              },
              added: function (id, fields) {
                var currHeight = $('.loop-indicator').height();
                if (currHeight === 0) currHeight = -5;
                $('.loop-indicator').height(currHeight + 55);
              },
              removed: function (id, fields) {
                $('.loop-indicator').height($('.loop-indicator').height() - 55);
                delete _rhythm[id];
                delete _sounds[id];
                var channelIds = Session.get('channels');
                var index = channelIds.indexOf(id);
                if (index > -1) {
                  channelIds.splice(index, 1);
                  Session.set('channels', channelIds);
                }
              }
            });
        });
      });
    });
    Session.set('looping', false);
  });

  // Some global listeners
  $(window).load(function () {
    $(window).scroll(function (event) {
      var controlBar = $('.fixed-wrap');
      if ($(window).scrollTop() >= 70){
        controlBar.addClass('fixed');
      }
      else {
        controlBar.removeClass('fixed');
      }
    });

    $(window).keypress(function (event) {
      if (event.keyCode === 32) {
        event.preventDefault();
        $('#play').click();
      }
    });

    $('html').click(function () {
      Session.set('addingChannel', false);
    });
  });
});

newSound = function (url, volume, autoplay, onload) {
  return new Howl({ urls: [url], volume: volume, autoplay: autoplay, onload: onload });
};

Template.layout.shouldRender = function () {
  return Session.get('channels') && Session.get('roomId') && Sounds.findOne();
};


////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.room = function () {
  return Rooms.findOne({name: Session.get('room')});
};

Template.room.swing = function () {
  var numberOfIs = Math.round(Math.abs(this.swing - 1) * 10);
  var word = 'sw';
  for (var i = numberOfIs; i >= 0; i--) { word += 'i'; }
  return word + 'ng';
};

loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function() {
      loopFunc((tickCount + 1) % 16);
    }, getInterval(tickCount));
  }
};

getInterval = function(tickCount) {
  var room = Rooms.findOne({name: Session.get('room')});
  var tempo = room.tempo;
  var swing = room.swing;
  if (tickCount % 2) swing = 2 - swing;
  return 60/tempo*1000/4*swing;
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
    Steps.find({active: true}).forEach(function (step) {
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
  },
  'click #minus-swing': function () {
    Meteor.call('deltaSwing', this._id, -0.1);
  },
  'click #plus-swing': function () {
    Meteor.call('deltaSwing', this._id, 0.1);
  },
  'click #swing': function () {
    Meteor.call('setSwing', this._id, 1);
  }
});

Template.room.notLooping = function () {
  return !Session.get('looping');
};



////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find({_id: {$in: Session.get('channels')}}, {sort: ['position', 'asc']});
};

Template.channels.created = function () {
  amplify.subscribe('tick', function (tickCount) {
    var channelIds = Object.keys(_rhythm);
    for (var i = channelIds.length - 1; i >= 0; i--) {
      var channelId = channelIds[i];
      if (_rhythm[channelId][tickCount]) {
        _sounds[channelId].play();
      }
    }
    var left = ($(window).width() - $('#top-div').width()) / 2 + 205 + 55 * tickCount;
    $('.loop-indicator').css('left', left);
  });
};

Template.channels.rendered = function () {
  $(document).on('mouseenter', '.step', function (event) {
    var data = event.currentTarget.dataset;
    if (Session.get('mousedown') && data.id !== Session.get('insideStep')) {
      Session.set('insideStep', data.id);
      Meteor.call('toggleStep', data.id, data.active !== 'true');
      if (Session.get('sound-on-change')) _sounds[data.channel].play();
    }
  });
  $(document).on('mouseleave', '.step', function (event) {
    Session.set('insideStep', undefined);
  });
};

Template.channels.events({
  'mousedown .step': function (event, template) {
    Session.set('mousedown', true);
    Session.set('insideStep', this._id);
    Meteor.call('toggleStep', this._id, !this.active);
    if (Session.get('sound-on-change')) _sounds[this.channelId].play();
  },
  'mouseup': function () {
    Session.set('mousedown', false);
    Session.set('insideStep', undefined);
  }
});



////////////////////////////////////////////////////////////////////////////////
// Channel Controls

Template.channelControls.variants = function () {
  return Sounds.findOne({name: this.soundName}).variants;
};

Template.channelControls.muted = function () {
  return this.volume === 0;
};

Template.channelControls.showVariantsList = function () {
  return Sounds.findOne({name: this.soundName}).variants.length > 1;
};

Template.channelControls.events({
  'click .clear-row': function (event, template) {
    Steps.find({active: true, _id: {$in: this.stepIds}}).forEach(function (step) {
      Meteor.call('toggleStep', step._id, false);
    });
  },
  'click .remove-channel': function () {
    Meteor.call('removeChannel', this._id);
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
    var url = this.url;
    var existingSound = _variants[url];
    if (existingSound) {
      existingSound.play();
    }
    else {
      _variants[url] = newSound(url, 1, true);
    }
  },
  'click #variant-menu > li > a': function (event, template) {
    var channelId = event.currentTarget.parentElement.parentElement.dataset.channel;
    Meteor.call('changeSound', channelId, this.name);
  },
  'mouseenter .channel-controls': function (event, template) {
    var name = template.find('.sound-name');
    $(name).stop();
    $(name).animate({left: '0px'}, 100, 'linear');
  },
  'mouseleave .channel-controls': function (event, template) {
    var name = template.find('.sound-name');
    $(name).stop();
    $(name).animate({left: '-23px'}, 100, 'linear');
  }
});



////////////////////////////////////////////////////////////////////////////////
// Steps

Template.step.getStep = function (stepId) {
  return Steps.findOne({_id: stepId});
};



////////////////////////////////////////////////////////////////////////////////
// Add Channel

Template.addChannel.addingChannel = function () {
  return Session.get('addingChannel');
};

Template.addChannel.sounds = function () {
  var publicSounds = Sounds.find({privateSound: false}).fetch();
  var privateSounds = Sounds.find({privateSound: true, ownerId: '!!!!!!!'});
  return publicSounds.concat(privateSounds);
};

Template.addChannel.events({
  'click .add-channel': function (event) {
    event.stopPropagation();
    Session.set('addingChannel', true);
  }
});