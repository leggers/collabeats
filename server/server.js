Meteor.startup(function () {
  Channels.find().forEach(function (channel) {
    Meteor.call('removeChannel', {channelId: channel._id});
  });
  var folder = '/808-sample-pack/';
  var urls = ['bass-drum/kickdrum0001.mp3',
              'closed-hihat/closed-hihat0001.mp3',
              'cymbal/cymbal0001.mp3',
              ];
  for(var i = 0; i < urls.length; i++) {
    Meteor.call('addChannel', {numSteps: 8, channelSoundUrl: urls[i], roomId: 0, name: 'channel' + i});
  }
});

Meteor.publish('steps', function () {
  // homepage room example beat

});