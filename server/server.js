Meteor.startup(function () {
  var urls = ['bass-drum/kickdrum0001.mp3',
              'snare-drum/snaredrum0001.mp3',
              'misc/clap.mp3',
              'misc/rimshot.mp3',
              'misc/maraca.mp3',
              'misc/clav.mp3',
              'misc/cowbell.mp3',
              'cymbal/cymbal0001.mp3',
              'closed-hihat/closed-hihat0001.mp3',
              'open-hihat/open-hihat0001.mp3',
              'low-conga/low-conga0001.mp3',
              'mid-conga/mid-conga0001.mp3',
              'hi-conga/hi-conga0001.mp3',
              'low-tom/low-tom0001.mp3',
              'mid-tom/mid-tom0001.mp3',
              'hi-tom/hi-tom0001.mp3'
              ];
  if (Rooms.find().count() != 1) {
    room = Rooms.insert({name: 'home', tempo: 120, channelIds: []});
    var folder = '/808-sample-pack/';
    for(var i = 0; i < urls.length; i++) {
      if (Channels.findOne({soundUrl: folder + urls[i]}) === undefined) {
        var name = urls[i].substr(0, urls[i].indexOf('/'));
        if (name === 'misc') name = urls[i].substr(urls[i].indexOf('/') + 1, urls[i].indexOf('.'));
        channelId = Meteor.call('addChannel', {
          numSteps: 16,
          channelSoundUrl: folder + urls[i],
          roomId: room._id,
          channelName: name
        });
        Meteor.call('addChannelToRoom', room, channelId);
      }
      else {
        Channels.update({soundUrl: folder + urls[i]}, {$set: {roomId: room._id}});
      }
    }
  }
});

Meteor.publish('rooms', function (roomName) {
  return Rooms.find({name: roomName});
});

Meteor.publish('channels', function (parentRoomId) {
  return Channels.find({roomId: parentRoomId});
});

Meteor.publish('steps', function (channelIds) {
  return Steps.find({channelId: {$in: channelIds}});
});