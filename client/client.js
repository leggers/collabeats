////////////////////////////////////////////////////////////////////////////////
// Data subscriptions, starup events, global helpers

Meteor.startup(function () {
  Session.set('page', 1);
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

        Meteor.subscribe('channels', currentRoom()._id, function () {

          // Sample and volume maintainance
          channelChangeObserver = Channels.find({roomId: room._id})
            .observeChanges({
              added: function (id, fields) {
                var currHeight = $('.loop-indicator').height();
                if (currHeight === 0) currHeight = -5;
                $('.loop-indicator').height(currHeight + 55);

                _rhythm[id] = [];
                addOrUpdateSound(id);
              },
              removed: function (id, fields) {
                $('.loop-indicator').height($('.loop-indicator').height() - 55);

                delete _rhythm[id];
                delete _sounds[id];
              },
              changed: function (id, fields) {
                if (fields.volume !== undefined) {
                  _sounds[id]._volume = fields.volume;
                }
                if (fields.selectedSound) {
                  addOrUpdateSound(id);
                }
                if (fields.muted !== undefined) {
                  if (fields.muted) {
                    _sounds[id]._volume = 0;
                  }
                  else {
                    _sounds[id]._volume = Channels.findOne(id).volume;
                  }
                }
              }
            });

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
      });
    });

    Deps.autorun(function () {
      if (currentRoom()) Meteor.subscribe('steps', currentRoom().channelIds);
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

    $(window).mouseup(function () {
      Session.set('painting', false);
      Session.set('insideStep', undefined);
      $('html').off('mousemove');
      if (Session.get('repositioning')) {
        _repositioningElement.css('z-index', 1);
        _repositioningElement.css('opacity', 1);
        _repositioningElement.css('top', 'none');
        _repositioningElement.css('position', 'none');
        Session.set('repositioning', false);
      }
    });
  });
});

currentRoom = function () {
  var roomName = 'home';
  if (Meteor.user())
    roomName = Meteor.user().profile.currentRoom;
  return Rooms.findOne({name: roomName});
};

addOrUpdateSound = function (channelId) {
  var channel = Channels.findOne(channelId);
  var sound = Sounds.findOne({name: channel.soundName});
  if (sound) {
    var url = sound.variants[channel.selectedSound - 1].url;
    var existingSound = _variants[url];
    if (existingSound) {
      var replacementSound = jQuery.extend({}, existingSound);
      replacementSound._volume = channel.volume;
      _sounds[channelId] = replacementSound;
    }
    else {
      newSound(url, channel.volume, false, function () {
        _sounds[channelId] = this;
      });
      newSound(url, 1, false, function () {
        _variants[url] = this;
      });
    }
  }
};

newSound = function (url, volume, autoplay, onload) {
  return new Howl({ urls: [url], volume: volume, autoplay: autoplay, onload: onload });
};



////////////////////////////////////////////////////////////////////////////////
// Layout

Template.layout.shouldRender = function () {
  return currentRoom() && Sounds.findOne();
};


Template.layout.created = function () {
  amplify.subscribe('tick', function (tickCount) {

    // Playing sounds
    var channelIds = Object.keys(_rhythm);
    for (var i = channelIds.length - 1; i >= 0; i--) {
      var channelId = channelIds[i];
      if (_rhythm[channelId][tickCount]) {
        _sounds[channelId].play();
      }
    }

    // Moving loop indicator
    var showIndicator = ((Session.get('page') - 1) * 16 - 1 < tickCount
      && tickCount < Session.get('page') * 16);
    var loopIndicator = $('.loop-indicator');
    if (showIndicator) {
      var distanceToFirstStep = ($(window).width() - $('#top-div').width()) / 2 + 205;
      var visualTick = tickCount % 16;
      var distanceToCurrentTick = 55 * visualTick;
      var countOffset = Math.floor( visualTick/4 ) * 5;
      var left = distanceToFirstStep + distanceToCurrentTick + countOffset;
      loopIndicator.css('left', left);
      loopIndicator.show();
    }
    else
      loopIndicator.hide();

    var pageButtons = $('.page-selector');
    var currentTickPage = Math.floor(tickCount / 16);
    for (i = pageButtons.length - 1; i >= 0; i--) {
      var button = $(pageButtons[i]);
      if (button.text() == currentTickPage + 1) {
        button.addClass('playing-page');
        // button.addClass('active');
      }
      else {
        button.removeClass('playing-page');
        // button.removeClass('active');
      }
    }

  });
};


////////////////////////////////////////////////////////////////////////////////
// Site Meta

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.room = function () {
  return currentRoom();
};

Template.roomControls.active = function (num) {
  return num === Session.get('page');
};

Template.roomControls.swing = function () {
  var numberOfIs = Math.round(Math.abs(this.swing - 1) * 10);
  var word = 'sw';
  for (var i = numberOfIs; i >= 0; i--) { word += 'i'; }
  return word + 'ng';
};

Template.roomControls.pageNumbers = function () {
  var channel = Channels.findOne({roomId: currentRoom()._id});
  if(channel) {
    numberOfTicks = channel.stepIds.length;
    var numberOfPages = Math.ceil(numberOfTicks / 16);
    return _.range(1, numberOfPages + 1);
  }
};

loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function() {
      loopFunc((tickCount + 1) % numberOfTicks);
    }, getInterval(tickCount));
  }
};

getInterval = function(tickCount) {
  var room = currentRoom();
  var tempo = room.tempo;
  var swing = room.swing;
  if (tickCount % 2) swing = 2 - swing;
  return 60/tempo*1000/4*swing;
};

Template.roomControls.events({
  'click button#play': function() {
    if (Session.get('looping')) {
      Session.set('looping', false);
      $('.page-selector').removeClass('playing-page');
    }
    else {
      Session.set('looping', true);
      loopFunc(0);
    }
  },
  'click #new-room': function () {
    $('#new-room > .text').hide();
    $('#new-room > .loading').show();
    channelChangeObserver.stop();
    stepObserver.stop();
    Meteor.call('newRoom', function (err, data) {
      if (err) console.log(err);
      Session.set('room', data);
    });
  },
  'click #slower': function () {
    Meteor.call('deltaRoomTempo', this._id, -5);
  },
  'click #faster': function () {
    Meteor.call('deltaRoomTempo', this._id, 5);
  },
  'click #tempo': function () {
    Meteor.call('changeRoomTempo', this._id, 120);
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
  },
  'click .page-selector': function () {
    if (!Session.get('changingPages')) {
      Session.set('changingPages', true);
      var oldPageNumber = Session.get('page');
      var newPageNumber = this.valueOf();

      // change step indicator
      Session.set('page', newPageNumber);
      $('.page-selector').removeClass('active');
      $('#page-' + newPageNumber).addClass('active');

      var channelIds = _.keys(_sounds);
      changePagesByChannel(channelIds, oldPageNumber, newPageNumber);
    }
  },
  'click #subtract-page': function () {
    Meteor.call('removePage', this._id);
  },
  'click #add-page': function (event) {
    $(event.currentTarget).addClass('disabled');
    Meteor.call('addPage', this._id);
    $(event.currentTarget).removeClass('disabled');
  },
  'click #clear': function () {
    _.each(Steps.find({active: true}).fetch(),
      function (step) {
        Meteor.call('toggleStep', step._id, false);
      }
    );
  },
  'click #login-buttons-button': function () {
    $('#login-link-text').click();
  },
  'click .logout': function () {
    Meteor.logout();
  }
});

Template.roomControls.notLooping = function () {
  return !Session.get('looping');
};

var getChannelStepsOnPage = function (channelId, page) {
  var channel = $("div[data-channel='" + channelId + "']").parent();
  var steps = channel.find(".step[data-page='" + page + "']");
  return  steps;
};

var changePagesByChannel = function (channelIds, oldPageNumber, newPageNumber) {
  if (channelIds.length) {
    var toChange = channelIds.pop();
    getChannelStepsOnPage(toChange, oldPageNumber).hide();
    getChannelStepsOnPage(toChange, newPageNumber).show();
    setTimeout(function () {
      changePagesByChannel(channelIds, oldPageNumber, newPageNumber);
    }, 0);
  }
  else {
    Session.set('changingPages', false);
  }
};

var hideVisibleStepsAndShowHiddenSteps = function (visibleSteps, hiddenSteps) {
  // first cull to steps we want
  visibleSteps = visibleSteps.filter(":visible");
  hiddenSteps = hiddenSteps.filter(":hidden");

  if (visibleSteps !== [] && hiddenSteps !== []) {
    visibleSteps.first().hide();
    hiddenSteps.first().show();
    setTimeout(function () {
      hideVisibleStepsAndShowHiddenSteps(visibleSteps, hiddenSteps);
    }, 0);
  }
};


////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find({roomId: this._id}, {sort: {position: 1}});
};

Template.channels.thisPageSteps = function () {
  var allStepIds = this.stepIds;
  var stepIndexToStart = (Session.get('page') - 1) * 16;
  var stepIndexToEnd = Session.get('page') * 16 - 1;
  return allStepIds.slice(stepIndexToStart, stepIndexToEnd + 1);
};

Template.channels.rendered = function () {
  $(document).on('mouseenter', '.step', function (event) {
    var data = event.currentTarget.dataset;
    if (Session.get('painting') && data.id !== Session.get('insideStep')) {
      Session.set('insideStep', data.id);
      Meteor.call('toggleStep', data.id, data.active !== 'true');
      if (Session.get('sound-on-change')) _sounds[data.channel].play();
    }
  });
  $(document).on('mouseleave', '.step', function (event) {
    Session.set('insideStep', undefined);
  });
  $(document).on('mouseenter', '.drag-box', function (event) {
    if (Session.get('repositioning')) {
      var toSwitchData = event.currentTarget.children[0].dataset;
      var draggedElemData = _repositioningElement.children()[0].dataset;

      Meteor.call('changePosition', toSwitchData.channel, Number(draggedElemData.position));
      Meteor.call('changePosition', draggedElemData.channel, Number(toSwitchData.position));
    }
  });
};

Template.channels.events({
  'mousedown .step': function (event, template) {
    Session.set('painting', true);
    Session.set('insideStep', this._id);
    Meteor.call('toggleStep', this._id, !this.active);
    if (Session.get('sound-on-change')) _sounds[this.channelId].play();
  },
  'mousedown .sound-name': function (event) {
    Session.set('repositioning', true);
    _repositioningElement = $(event.currentTarget.parentElement.parentElement.parentElement);
    _repositioningElement.css('position', 'absolute');
    _repositioningElement.css('z-index', -1);
    _repositioningElement.css('opacity', 0.5);
    $('html').mousemove(function (event) {
      _repositioningElement.css('top', event.pageY - 40);
    });
  }
});



////////////////////////////////////////////////////////////////////////////////
// Channel Controls

Template.channelControls.variants = function () {
  return Sounds.findOne({name: this.soundName}).variants;
};

Template.channelControls.showVariantsList = function () {
  return Sounds.findOne({name: this.soundName}).variants.length > 1;
};

Template.channelControls.muted = function () {
  return this.muted || this.volume === 0;
};

Template.channelControls.volumeBarStyle = function () {
  var height = this.volume * 50;
  if (this.muted) height = 0;
  if (height > 50) height = 50;

  var margin = 50 - height;

  return 'height:' + height + 'px;margin-top:' + margin + 'px;';
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
    Meteor.call('setChannelMute', this._id, !this.muted);
  },
  'click .glyphicon-play': function (event, template) {
    _sounds[this._id].play();
  },
  'click #variant-menu > li > a > span > .glyphicon': function (event, template) {
    event.stopPropagation();
    var url = this.url;
    var existingSound = _variants[url];
    if (existingSound) {
      existingSound.play();
    }
    else {
      var loadingGif = $(event.currentTarget.previousElementSibling).show();
      var bell = $(event.currentTarget).hide();
      _variants[url] = newSound(url, 1, true, function () {
        loadingGif.hide();
        bell.show();
      });
    }
  },
  'click #variant-menu > li > a': function (event, template) {
    var channelId = event.currentTarget.parentElement.parentElement.dataset.channel;
    Meteor.call('changeSound', channelId, this.name);
  },
  'mouseenter .channel-controls': function (event, template) {
    var icon = template.find('.glyphicon-resize-vertical');
    if (!Session.get('repositioning')) $(icon).show();
  },
  'mouseleave .channel-controls': function (event, template) {
    var icon = template.find('.glyphicon-resize-vertical');
    if (!Session.get('repositioning')) $(icon).hide();
  }
});



////////////////////////////////////////////////////////////////////////////////
// Steps

Template.step.getStep = function (stepId) {
  return Steps.findOne(stepId);
};

Template.step.pageNum = function () {
  return Math.floor(this.position / 16) + 1;
};

Template.step.firstPage = function () {
  return Template.step.pageNum.call(this) == 1;
};



////////////////////////////////////////////////////////////////////////////////
// Add Channel

Template.addChannel.addingChannel = function () {
  return Session.get('addingChannel');
};

Template.addChannel.sounds = function () {
  var publicSounds = Sounds.find({privateSound: false}).fetch();
  var privateSounds = Sounds.find({privateSound: true, ownerId: '!!!!!!!'}).fetch();
  return publicSounds.concat(privateSounds);
};

Template.addChannel.rendered = function () {
  $('.step[data-page="1"]').show();
};

Template.addChannel.events({
  'mouseenter .add-channel': function () {
    Session.set('addingChannel', true);
  },
  'mouseleave .add-channel': function () {
    Session.set('addingChannel', false);
  },
  'click #sound-menu li': function (event, template) {
    Meteor.call('newChannel', currentRoom()._id, this.name);
  }
});