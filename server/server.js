Meteor.startup(function () {
  var urls = ['bass-drum/kickdrum0001.mp3',
              'closed-hihat/closed-hihat0001.mp3',
              'cymbal/cymbal0001.mp3',
              'misc/clap.mp3'
              ];
  if (Channels.find().count() != urls.length) {
    var folder = '/808-sample-pack/';
    for(var i = 0; i < urls.length; i++) {
      if (Channels.findOne({soundUrl: folder + urls[i]}) === undefined) {
        Meteor.call('addChannel', {
          numSteps: 16,
          channelSoundUrl: folder + urls[i],
          roomId: 0,
          channelName: 'channel' + i
        });
      }
    }
  }
});

// Meteor.publish('steps', function () {
//   // homepage room example beat

// });