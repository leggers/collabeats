Meteor.startup(function () {
  var urls = ['bass-drum/kickdrum0001.mp3',
              'snare-drum/snaredrum0001.mp3',
              'misc/clap.mp3',
              'misc/rimshot.mp3',
              'misc/maraca.mp3',
              'misc/clav.mp3',
              'cymbal/cymbal0001.mp3',
              'closed-hihat/closed-hihat0001.mp3',
              'open-hihat/open-hihat0001.mp3',
              'low-conga/low-conga0001.mp3',
              'low-tom/low-tom0001.mp3',
              'mid-conga/mid-conga0001.mp3',
              'mid-tom/mid-tom0001.mp3',
              'hi-conga/hi-conga0001.mp3',
              'hi-tom/hi-tom0001.mp3'
              ];
  if (Channels.find().count() != urls.length) {
    var folder = '/808-sample-pack/';
    for(var i = 0; i < urls.length; i++) {
      if (Channels.findOne({soundUrl: folder + urls[i]}) === undefined) {
        var name = urls[i].substr(0, urls[i].indexOf('/'));
        if (name === 'misc') name = urls[i].substr(urls[i].indexOf('/'), urls[i].indexOf('.'));
        Meteor.call('addChannel', {
          numSteps: 16,
          channelSoundUrl: folder + urls[i],
          roomId: 0,
          channelName: name
        });
      }
    }
  }
});

// Meteor.publish('steps', function () {
//   // homepage room example beat

// });
