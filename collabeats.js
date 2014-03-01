if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to collabeats.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
        var sound = new Howl({
          urls: ['/808_Original.wav'],
          autoplay: true,
          onloaderror: function() {console.log('error!');},
          onload: function() {console.log('error!');}
        });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
