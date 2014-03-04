Meteor.startup(function () {
  if (Steps.find().count() === 0) {
    var folder = '/808-sample-pack/';
    var urls = ['bass-drum/kickdrum0001.mp3',
                'closed-hihat/closed-hihat0001.mp3',
                'cymbal/cymbal0001.mp3',
                ];
    for(var i = 0; i < urls.length; i++) {
      Steps.insert({sound_url: folder + urls[i], active: true});
    }
  }
});

Meteor.publish('steps', function () {
  // homepage room example beat

});