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
  urls: ['/808-sample-pack/bass-drum/kickdrum0001.mp3'],
  onloaderror: function() {console.log('error!');},
  onload: function() {console.log('loaded');}
});

var looping = false;
var tempo = 124;

var loopFunc = function(tickCount) {
  console.log('looping');
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
      loopFunc(0);
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

Template.step.getStep = function (stepId) {
  return Steps.findOne({_id: stepId});
};