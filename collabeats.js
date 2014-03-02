if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to collabeats.";
  };

  Template.hello.getInterval = function() {
    return getInterval();
  };

  var sound = new Howl({
    urls: ['/808-sample-pack/Closed-Hihat/closedHat1.mp3'],
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
    return tempo;
  };

  Template.hello.events({
    'click input#play-once': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        sound.play();
    },
    'click input#start-beat': function() {
      looping = true;
      loopFunc();
    },
    'change input#tempo': function() {
      console.log(this);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
