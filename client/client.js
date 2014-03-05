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
  urls: ['/808-sample-pack/closed-hihat/closedHat1.mp3'],
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

Template.step.events({
  'click .step': function (event) {
    Meteor.call('toggleStep', this._id, !this.active);
    console.log(this._id);
    console.log(this.active);
  }
});

Template.channels.getStep = function (stepId, options) {
  var contents = options.fn(Steps.findOne({_id: stepId}));
  return contents;
};