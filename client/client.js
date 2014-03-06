Template.hello.greeting = function () {
  return "808 meets Google Docs.";
};

Template.hello.getInterval = function() {
  return tempo;
};

Template.hello.getSteps = function () {
  return Steps.find();
};

var sound = new Howl({
  urls: ['/808-sample-pack/cymbal/cymbal0007.mp3'],
  onloaderror: function() {console.log('error!');},
  onload: function() {console.log('loaded');}
});

var looping = false;
var tempo = 124;

var loopFunc = function() {
  console.log('looping');
  if (looping) {
    sound.play();
    setTimeout(function(){
      loopFunc();
    }, getInterval());
  }
};

var getInterval = function() {
  return 60/tempo*1000;
};

Template.hello.events({
  'click input#play-once': function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      sound.play();
  },
  'click input#start-beat': function(event) {
    if (looping) {
      looping = false;
      event.currentTarget.value = "Start Loop";
    }
    else {
      looping = true;
      loopFunc();
      event.currentTarget.value = "Stop Loop";
    }
  },
  'change input#tempo': function(event) {
    tempo = event.currentTarget.value;
  }
});

Template.channels.channels = function () {
  return Channels.find();
};

Template.channels.rendered = function () {
  sounds = Session.sounds || {};
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

Template.step.getStep = function (stepId, options) {
  return Steps.findOne({_id: stepId});
};