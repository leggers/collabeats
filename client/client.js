////////////////////////////////////////////////////////////////////////////////
// Layout

Template.layout.getSteps = function () {
  return Steps.find();
};

var looping = false;
var tempo = 124;

var loopFunc = function(tickCount) {
  if (looping) {
    amplify.publish('tick', tickCount);
    setTimeout(function(){
      loopFunc((tickCount+= 1) % 16);
    }, getInterval());
  }
};

var getInterval = function() {
  return 60/tempo*1000/4;
};

Template.layout.events({
  'click button#play': function(event) {
    if (looping) {
      looping = false;
      $('.icon-stop').hide();
      $('.icon-play').show();
    }
    else {
      looping = true;
      loopFunc(0);
      $('.icon-play').hide();
      $('.icon-stop').show();
    }
  },
  'change input#tempo': function(event) {
    tempo = event.currentTarget.value;
  }
});



////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.rooms.getInterval = function() {
  return tempo;
};



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