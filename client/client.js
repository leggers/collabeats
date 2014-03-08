////////////////////////////////////////////////////////////////////////////////
// Startup

Meteor.startup(function () {
  room = Session.get('room') || "home";
  Session.set('room', room);
  Session.set('looping', false);
});



////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.room = function () {
  return Rooms.findOne({name: Session.get('room')});
};

var loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function(){
      loopFunc((tickCount+= 1) % 16);
    }, getInterval());
  }
};

var getInterval = function() {
  return 60/tempo*1000/4;
};

Template.room.events({
  'click button#play': function(event) {
    if (Session.get('looping')) {
      Session.set('looping', false);
      $('.icon-stop').hide();
      $('.icon-play').show();
    }
    else {
      Session.set('looping', true);
      loopFunc(0);
      $('.icon-play').hide();
      $('.icon-stop').show();
    }
  },
  'change input#tempo': function(event) {
    Meteor.call('changeRoomTempo', this._id, event.currentTarget.value);
  }
});



////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find();
};

Template.channels.created = function () {
  amplify.subscribe('tick', function (tickCount) {
    Channels.find().forEach(function (channel) {
      step = Steps.findOne({_id: channel.stepIds[tickCount]});
      if (step.active) Session.sounds[channel._id].play();
    });
  });
};

Template.channels.rendered = function () {
  sounds = Session.sounds || {};
  Session.sounds = Session.sounds;
  Template.channels.channels().forEach(function (channel) {
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