Meteor.startup(function () {
  var folder = '/808-sample-pack/';
  var soundsData = {
    "Kick": [
      {name: '1',  url: folder + 'bass-drum/kickdrum0001.mp3'},
      {name: '2',  url: folder + 'bass-drum/kickdrum0002.mp3'},
      {name: '3',  url: folder + 'bass-drum/kickdrum0003.mp3'},
      {name: '4',  url: folder + 'bass-drum/kickdrum0004.mp3'},
      {name: '5',  url: folder + 'bass-drum/kickdrum0005.mp3'},
      {name: '6',  url: folder + 'bass-drum/kickdrum0006.mp3'},
      {name: '7',  url: folder + 'bass-drum/kickdrum0007.mp3'},
      {name: '8',  url: folder + 'bass-drum/kickdrum0008.mp3'},
      {name: '9',  url: folder + 'bass-drum/kickdrum0009.mp3'},
      {name: '10', url: folder + 'bass-drum/kickdrum0010.mp3'},
      {name: '11', url: folder + 'bass-drum/kickdrum0011.mp3'},
      {name: '12', url: folder + 'bass-drum/kickdrum0012.mp3'},
      {name: '13', url: folder + 'bass-drum/kickdrum0013.mp3'},
      {name: '14', url: folder + 'bass-drum/kickdrum0014.mp3'},
      {name: '15', url: folder + 'bass-drum/kickdrum0015.mp3'},
      {name: '16', url: folder + 'bass-drum/kickdrum0016.mp3'},
      {name: '17', url: folder + 'bass-drum/kickdrum0017.mp3'},
      {name: '18', url: folder + 'bass-drum/kickdrum0018.mp3'},
      {name: '19', url: folder + 'bass-drum/kickdrum0019.mp3'},
      {name: '20', url: folder + 'bass-drum/kickdrum0020.mp3'},
      {name: '21', url: folder + 'bass-drum/kickdrum0021.mp3'},
      {name: '22', url: folder + 'bass-drum/kickdrum0022.mp3'},
      {name: '23', url: folder + 'bass-drum/kickdrum0023.mp3'}
    ],
    "Snare": [
      {name: '1',  url: folder + 'snare-drum/snaredrum0001.mp3'},
      {name: '2',  url: folder + 'snare-drum/snaredrum0002.mp3'},
      {name: '3',  url: folder + 'snare-drum/snaredrum0003.mp3'},
      {name: '4',  url: folder + 'snare-drum/snaredrum0004.mp3'},
      {name: '5',  url: folder + 'snare-drum/snaredrum0005.mp3'},
      {name: '6',  url: folder + 'snare-drum/snaredrum0006.mp3'},
      {name: '7',  url: folder + 'snare-drum/snaredrum0007.mp3'},
      {name: '8',  url: folder + 'snare-drum/snaredrum0008.mp3'},
      {name: '9',  url: folder + 'snare-drum/snaredrum0009.mp3'},
      {name: '10', url: folder + 'snare-drum/snaredrum0010.mp3'},
      {name: '11', url: folder + 'snare-drum/snaredrum0011.mp3'},
      {name: '12', url: folder + 'snare-drum/snaredrum0012.mp3'},
      {name: '13', url: folder + 'snare-drum/snaredrum0013.mp3'},
      {name: '14', url: folder + 'snare-drum/snaredrum0014.mp3'},
      {name: '15', url: folder + 'snare-drum/snaredrum0015.mp3'},
      {name: '16', url: folder + 'snare-drum/snaredrum0016.mp3'},
      {name: '17', url: folder + 'snare-drum/snaredrum0017.mp3'},
      {name: '18', url: folder + 'snare-drum/snaredrum0018.mp3'},
      {name: '19', url: folder + 'snare-drum/snaredrum0019.mp3'},
      {name: '20', url: folder + 'snare-drum/snaredrum0020.mp3'},
      {name: '21', url: folder + 'snare-drum/snaredrum0021.mp3'},
      {name: '22', url: folder + 'snare-drum/snaredrum0022.mp3'},
      {name: '23', url: folder + 'snare-drum/snaredrum0023.mp3'},
      {name: '24', url: folder + 'snare-drum/snaredrum0024.mp3'},
      {name: '25', url: folder + 'snare-drum/snaredrum0025.mp3'},
      {name: '26', url: folder + 'snare-drum/snaredrum0026.mp3'},
      {name: '27', url: folder + 'snare-drum/snaredrum0027.mp3'},
      {name: '28', url: folder + 'snare-drum/snaredrum0028.mp3'},
      {name: '29', url: folder + 'snare-drum/snaredrum0029.mp3'},
      {name: '30', url: folder + 'snare-drum/snaredrum0030.mp3'},
      {name: '31', url: folder + 'snare-drum/snaredrum0031.mp3'},
      {name: '32', url: folder + 'snare-drum/snaredrum0032.mp3'},
      {name: '33', url: folder + 'snare-drum/snaredrum0033.mp3'},
      {name: '34', url: folder + 'snare-drum/snaredrum0034.mp3'},
      {name: '35', url: folder + 'snare-drum/snaredrum0035.mp3'},
      {name: '36', url: folder + 'snare-drum/snaredrum0036.mp3'},
      {name: '37', url: folder + 'snare-drum/snaredrum0037.mp3'},
      {name: '38', url: folder + 'snare-drum/snaredrum0038.mp3'},
      {name: '39', url: folder + 'snare-drum/snaredrum0039.mp3'},
      {name: '40', url: folder + 'snare-drum/snaredrum0040.mp3'},
      {name: '41', url: folder + 'snare-drum/snaredrum0041.mp3'},
      {name: '42', url: folder + 'snare-drum/snaredrum0042.mp3'},
      {name: '43', url: folder + 'snare-drum/snaredrum0043.mp3'},
      {name: '44', url: folder + 'snare-drum/snaredrum0044.mp3'},
      {name: '45', url: folder + 'snare-drum/snaredrum0045.mp3'}
    ],
    "Clap": [
      {name: '1', url: folder + 'misc/clap.mp3'}
    ],
    "Rimshot": [
      {name: '1', url: folder + 'misc/rimshot.mp3'}
    ],
    "Clav": [
      {name: '1', url: folder + 'misc/clav.mp3'}
    ],
    "Maraca": [
      {name: '1', url: folder + 'misc/maraca.mp3'}
    ],
    "Cowbell": [
      {name: '1', url: folder + 'misc/cowbell.mp3'}
    ],
    "Cymbal": [
      {name: '1',  url: folder + 'cymbal/cymbal0001.mp3'},
      {name: '2',  url: folder + 'cymbal/cymbal0002.mp3'},
      {name: '3',  url: folder + 'cymbal/cymbal0003.mp3'},
      {name: '4',  url: folder + 'cymbal/cymbal0004.mp3'},
      {name: '5',  url: folder + 'cymbal/cymbal0005.mp3'},
      {name: '6',  url: folder + 'cymbal/cymbal0006.mp3'},
      {name: '7',  url: folder + 'cymbal/cymbal0007.mp3'},
      {name: '8',  url: folder + 'cymbal/cymbal0008.mp3'},
      {name: '9',  url: folder + 'cymbal/cymbal0009.mp3'},
      {name: '10', url: folder + 'cymbal/cymbal0010.mp3'},
      {name: '11', url: folder + 'cymbal/cymbal0011.mp3'},
      {name: '12', url: folder + 'cymbal/cymbal0012.mp3'},
      {name: '13', url: folder + 'cymbal/cymbal0013.mp3'},
      {name: '14', url: folder + 'cymbal/cymbal0014.mp3'},
      {name: '15', url: folder + 'cymbal/cymbal0015.mp3'},
      {name: '16', url: folder + 'cymbal/cymbal0016.mp3'},
      {name: '17', url: folder + 'cymbal/cymbal0017.mp3'},
      {name: '18', url: folder + 'cymbal/cymbal0018.mp3'},
      {name: '19', url: folder + 'cymbal/cymbal0019.mp3'},
      {name: '20', url: folder + 'cymbal/cymbal0020.mp3'},
      {name: '21', url: folder + 'cymbal/cymbal0021.mp3'},
      {name: '22', url: folder + 'cymbal/cymbal0022.mp3'},
      {name: '23', url: folder + 'cymbal/cymbal0023.mp3'},
      {name: '24', url: folder + 'cymbal/cymbal0024.mp3'},
      {name: '25', url: folder + 'cymbal/cymbal0025.mp3'},
      {name: '26', url: folder + 'cymbal/cymbal0026.mp3'},
      {name: '27', url: folder + 'cymbal/cymbal0027.mp3'},
      {name: '28', url: folder + 'cymbal/cymbal0028.mp3'},
      {name: '29', url: folder + 'cymbal/cymbal0029.mp3'},
      {name: '30', url: folder + 'cymbal/cymbal0030.mp3'},
      {name: '31', url: folder + 'cymbal/cymbal0031.mp3'},
      {name: '32', url: folder + 'cymbal/cymbal0032.mp3'},
      {name: '33', url: folder + 'cymbal/cymbal0033.mp3'},
      {name: '34', url: folder + 'cymbal/cymbal0034.mp3'},
      {name: '35', url: folder + 'cymbal/cymbal0035.mp3'},
      {name: '36', url: folder + 'cymbal/cymbal0036.mp3'},
      {name: '37', url: folder + 'cymbal/cymbal0037.mp3'},
      {name: '38', url: folder + 'cymbal/cymbal0038.mp3'},
      {name: '39', url: folder + 'cymbal/cymbal0039.mp3'},
      {name: '40', url: folder + 'cymbal/cymbal0040.mp3'},
      {name: '41', url: folder + 'cymbal/cymbal0041.mp3'},
      {name: '42', url: folder + 'cymbal/cymbal0042.mp3'}
    ],
    "Closed Hihat": [
      {name: '1', url: folder + 'closed-hihat/closed-hihat0001.mp3'},
      {name: '2', url: folder + 'closed-hihat/closed-hihat0002.mp3'},
      {name: '3', url: folder + 'closed-hihat/closed-hihat0003.mp3'},
      {name: '4', url: folder + 'closed-hihat/closed-hihat0004.mp3'}
    ],
    "Open Hihat": [
      {name: '1', url: folder + 'open-hihat/open-hihat0001.mp3'},
      {name: '2', url: folder + 'open-hihat/open-hihat0002.mp3'},
      {name: '3', url: folder + 'open-hihat/open-hihat0003.mp3'},
      {name: '4', url: folder + 'open-hihat/open-hihat0004.mp3'},
      {name: '5', url: folder + 'open-hihat/open-hihat0005.mp3'},
      {name: '6', url: folder + 'open-hihat/open-hihat0006.mp3'},
      {name: '7', url: folder + 'open-hihat/open-hihat0007.mp3'}
    ],
    "Low Conga": [
      {name: '1', url: folder + 'low-conga/low-conga0001.mp3'},
      {name: '2', url: folder + 'low-conga/low-conga0002.mp3'},
      {name: '3', url: folder + 'low-conga/low-conga0003.mp3'},
      {name: '4', url: folder + 'low-conga/low-conga0004.mp3'},
      {name: '5', url: folder + 'low-conga/low-conga0005.mp3'},
      {name: '6', url: folder + 'low-conga/low-conga0006.mp3'},
      {name: '7', url: folder + 'low-conga/low-conga0007.mp3'},
      {name: '8', url: folder + 'low-conga/low-conga0008.mp3'}
    ],
    "Mid Conga": [
      {name: '1', url: folder + 'mid-conga/mid-conga0001.mp3'},
      {name: '2', url: folder + 'mid-conga/mid-conga0002.mp3'},
      {name: '3', url: folder + 'mid-conga/mid-conga0003.mp3'},
      {name: '4', url: folder + 'mid-conga/mid-conga0004.mp3'},
      {name: '5', url: folder + 'mid-conga/mid-conga0005.mp3'},
      {name: '6', url: folder + 'mid-conga/mid-conga0006.mp3'},
      {name: '7', url: folder + 'mid-conga/mid-conga0007.mp3'},
      {name: '8', url: folder + 'mid-conga/mid-conga0008.mp3'}
    ],
    "High Conga": [
      {name: '1', url: folder + 'hi-conga/hi-conga0001.mp3'},
      {name: '2', url: folder + 'hi-conga/hi-conga0002.mp3'},
      {name: '3', url: folder + 'hi-conga/hi-conga0003.mp3'},
      {name: '4', url: folder + 'hi-conga/hi-conga0004.mp3'},
      {name: '5', url: folder + 'hi-conga/hi-conga0005.mp3'},
      {name: '6', url: folder + 'hi-conga/hi-conga0006.mp3'},
      {name: '7', url: folder + 'hi-conga/hi-conga0007.mp3'},
      {name: '8', url: folder + 'hi-conga/hi-conga0008.mp3'},
      {name: '9', url: folder + 'hi-conga/hi-conga0009.mp3'}
    ],
    "Low Tom": [
      {name: '1', url: folder + 'low-tom/low-tom0001.mp3'},
      {name: '2', url: folder + 'low-tom/low-tom0002.mp3'},
      {name: '3', url: folder + 'low-tom/low-tom0003.mp3'},
      {name: '4', url: folder + 'low-tom/low-tom0004.mp3'},
      {name: '5', url: folder + 'low-tom/low-tom0005.mp3'},
      {name: '6', url: folder + 'low-tom/low-tom0006.mp3'},
      {name: '7', url: folder + 'low-tom/low-tom0007.mp3'},
      {name: '8', url: folder + 'low-tom/low-tom0008.mp3'}
    ],
    "Mid Tom": [
      {name: '1', url: folder + 'mid-tom/mid-tom0001.mp3'},
      {name: '2', url: folder + 'mid-tom/mid-tom0002.mp3'},
      {name: '3', url: folder + 'mid-tom/mid-tom0003.mp3'},
      {name: '4', url: folder + 'mid-tom/mid-tom0004.mp3'},
      {name: '5', url: folder + 'mid-tom/mid-tom0005.mp3'},
      {name: '6', url: folder + 'mid-tom/mid-tom0006.mp3'}
    ],
    "High Tom": [
      {name: '1', url: folder + 'hi-tom/hi-tom0001.mp3'},
      {name: '2', url: folder + 'hi-tom/hi-tom0002.mp3'},
      {name: '3', url: folder + 'hi-tom/hi-tom0003.mp3'},
      {name: '4', url: folder + 'hi-tom/hi-tom0004.mp3'},
      {name: '5', url: folder + 'hi-tom/hi-tom0005.mp3'},
      {name: '6', url: folder + 'hi-tom/hi-tom0006.mp3'},
      {name: '7', url: folder + 'hi-tom/hi-tom0007.mp3'}
    ]
  };

  var soundNames = Object.keys(soundsData);
  if (Sounds.find().count() != soundNames.length) {
    for (var i = soundNames.length - 1; i >= 0; i--) {
      if (Sounds.findOne({name: soundNames[i]}) === undefined) {
        Meteor.call('addSound', {
          soundName: soundNames[i],
          variants: soundsData[ soundNames[i] ],
          privateSound: false
        });
      }
    }
  }
  if (Rooms.findOne({name: 'home'}) === undefined) {
    var roomId = Meteor.call('newRoom');
    Meteor.call('renameRoom', roomId, 'home');
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

Meteor.publish('sounds', function () {
  return Sounds.find();
});

Meteor.methods({
  addRoom: function (roomId) {
    Rooms.insert({
      _id: roomId,
      name: roomId,
      tempo: 120,
      swing: 1,
      channelIds: [],
      ticks: 16
    });

    Sounds.find().forEach(function (sound) {
      if (Channels.findOne({soundName: sound.name, roomId: roomId}) === undefined) {
        Meteor.call('newChannel', roomId, sound.name);
      }
    });

    Meteor.call('addPage', roomId);
  },
  newChannel: function (roomId, soundName) {
    var position = 0;
    var channelLength = Rooms.findOne(roomId).ticks;
    var currentChannels = Channels.find({roomId: roomId}, {sort: {position: -1}}).fetch();
    if (currentChannels.length) position = currentChannels[0].position + 1;
    var channelId = Meteor.call('addChannel', {
      numSteps: channelLength,
      roomId: roomId,
      soundName: soundName,
      selectedSound: 1,
      position: position,
      volume: 0.5,
      muted: false
    });
    Rooms.update(roomId, {$push: {channelIds: channelId}});
  },
  addChannel: function (options) {
    var channelId = Channels.insert({
      roomId: options.roomId,
      soundName: options.soundName,
      selectedSound: options.selectedSound,
      creatorId: this.userId,
      position: options.position,
      volume: options.volume,
      muted: options.muted,
      stepIds: []
    });
    return channelId;
  },
  addPage: function (roomId) {
    console.log('addPage');
    var room = Rooms.findOne(roomId);
    _.each(room.channelIds,
      function (channelId, list, index) {
        var channel = Channels.findOne(channelId);
        var startNumSteps = channel.stepIds.length;
        _.each(_.range(16),
          function (number, list, index) {
            var stepId = new Meteor.Collection.ObjectID()._str;
            Meteor.call('addStepToChannel', channelId, startNumSteps + number, stepId);
          }
        );
      }
    );
  },
  addStepToChannel: function (channelId, position, stepId) {
    var toPush = Steps.insert({
      _id: stepId || new Meteor.Collection.ObjectID()._str,
      active: false,
      lastChangerId: this.userId,
      position: position,
      channelId: channelId
    });
    Channels.update(channelId, {$push: {stepIds: toPush}});
  },
  removePage: function (roomId) {
    var room = Rooms.findOne(roomId);
    _.each(room.channelIds,
      function (channelId, list, index) {
        var stepIds = Channels.findOne(channelId).stepIds;
        var toPull = _.last(stepIds, 16);
        for (var i = toPull.length - 1; i >= 0; i--) {
          Channels.update(channelId, {$pull: {stepIds: toPull[i]}});
          Steps.remove(toPull[i]);
        };
      }
    );
  },
  destroyEverything: function () {
    Steps.remove({});
    Channels.remove({});
    Rooms.remove({});
  }
});