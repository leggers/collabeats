if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to collabeats.";
  };

  var sound = new Howl({
    urls: ['/808-sample-pack/Closed-Hihat/closedHat1.mp3'],
    onloaderror: function() {console.log('error!');},
    onload: function() {console.log('loaded');}
  });

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        sound.play();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
