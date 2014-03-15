Meteor.startup(function () {
  var folder = '/808-sample-pack/';
  var soundsData = {
    "Kick": {
      '1':  folder + 'bass-drum/kickdrum0001.mp3',
      '2':  folder + 'bass-drum/kickdrum0002.mp3',
      '3':  folder + 'bass-drum/kickdrum0003.mp3',
      '4':  folder + 'bass-drum/kickdrum0004.mp3',
      '5':  folder + 'bass-drum/kickdrum0005.mp3',
      '6':  folder + 'bass-drum/kickdrum0006.mp3',
      '7':  folder + 'bass-drum/kickdrum0007.mp3',
      '8':  folder + 'bass-drum/kickdrum0008.mp3',
      '9':  folder + 'bass-drum/kickdrum0009.mp3',
      '10': folder + 'bass-drum/kickdrum0010.mp3',
      '11': folder + 'bass-drum/kickdrum0011.mp3',
      '12': folder + 'bass-drum/kickdrum0012.mp3',
      '13': folder + 'bass-drum/kickdrum0013.mp3',
      '14': folder + 'bass-drum/kickdrum0014.mp3',
      '15': folder + 'bass-drum/kickdrum0015.mp3',
      '16': folder + 'bass-drum/kickdrum0016.mp3',
      '17': folder + 'bass-drum/kickdrum0017.mp3',
      '18': folder + 'bass-drum/kickdrum0018.mp3',
      '19': folder + 'bass-drum/kickdrum0019.mp3',
      '20': folder + 'bass-drum/kickdrum0020.mp3',
      '21': folder + 'bass-drum/kickdrum0021.mp3',
      '22': folder + 'bass-drum/kickdrum0022.mp3',
      '23': folder + 'bass-drum/kickdrum0023.mp3'
    },
    "Snare": {
      '1':  folder + 'snare-drum/snaredrum0001.mp3',
      '2':  folder + 'snare-drum/snaredrum0002.mp3',
      '3':  folder + 'snare-drum/snaredrum0003.mp3',
      '4':  folder + 'snare-drum/snaredrum0004.mp3',
      '5':  folder + 'snare-drum/snaredrum0005.mp3',
      '6':  folder + 'snare-drum/snaredrum0006.mp3',
      '7':  folder + 'snare-drum/snaredrum0007.mp3',
      '8':  folder + 'snare-drum/snaredrum0008.mp3',
      '9':  folder + 'snare-drum/snaredrum0009.mp3',
      '10': folder + 'snare-drum/snaredrum0010.mp3',
      '11': folder + 'snare-drum/snaredrum0011.mp3',
      '12': folder + 'snare-drum/snaredrum0012.mp3',
      '13': folder + 'snare-drum/snaredrum0013.mp3',
      '14': folder + 'snare-drum/snaredrum0014.mp3',
      '15': folder + 'snare-drum/snaredrum0015.mp3',
      '16': folder + 'snare-drum/snaredrum0016.mp3',
      '17': folder + 'snare-drum/snaredrum0017.mp3',
      '18': folder + 'snare-drum/snaredrum0018.mp3',
      '19': folder + 'snare-drum/snaredrum0019.mp3',
      '20': folder + 'snare-drum/snaredrum0020.mp3',
      '21': folder + 'snare-drum/snaredrum0021.mp3',
      '22': folder + 'snare-drum/snaredrum0022.mp3',
      '23': folder + 'snare-drum/snaredrum0023.mp3',
      '24': folder + 'snare-drum/snaredrum0024.mp3',
      '25': folder + 'snare-drum/snaredrum0025.mp3',
      '26': folder + 'snare-drum/snaredrum0026.mp3',
      '27': folder + 'snare-drum/snaredrum0027.mp3',
      '28': folder + 'snare-drum/snaredrum0028.mp3',
      '29': folder + 'snare-drum/snaredrum0029.mp3',
      '30': folder + 'snare-drum/snaredrum0030.mp3',
      '31': folder + 'snare-drum/snaredrum0031.mp3',
      '32': folder + 'snare-drum/snaredrum0032.mp3',
      '33': folder + 'snare-drum/snaredrum0033.mp3',
      '34': folder + 'snare-drum/snaredrum0034.mp3',
      '35': folder + 'snare-drum/snaredrum0035.mp3',
      '36': folder + 'snare-drum/snaredrum0036.mp3',
      '37': folder + 'snare-drum/snaredrum0037.mp3',
      '38': folder + 'snare-drum/snaredrum0038.mp3',
      '39': folder + 'snare-drum/snaredrum0039.mp3',
      '40': folder + 'snare-drum/snaredrum0040.mp3',
      '41': folder + 'snare-drum/snaredrum0041.mp3',
      '42': folder + 'snare-drum/snaredrum0042.mp3',
      '43': folder + 'snare-drum/snaredrum0043.mp3',
      '44': folder + 'snare-drum/snaredrum0044.mp3',
      '45': folder + 'snare-drum/snaredrum0045.mp3'
    },
    "Clap": {
      '1': folder + 'misc/clap.mp3'
    },
    "Rimshot": {
      '1': folder + 'misc/rimshot.mp3'
    },
    "Clav": {
      '1': folder + 'misc/clav.mp3'
    },
    "Maraca": {
      '1': folder + 'misc/maraca.mp3'
    },
    "Cowbell": {
      '1': folder + 'misc/cowbell.mp3'
    },
    "Cymbal": {
      '1':  folder + 'cymbal/cymbal0001.mp3',
      '2':  folder + 'cymbal/cymbal0002.mp3',
      '3':  folder + 'cymbal/cymbal0003.mp3',
      '4':  folder + 'cymbal/cymbal0004.mp3',
      '5':  folder + 'cymbal/cymbal0005.mp3',
      '6':  folder + 'cymbal/cymbal0006.mp3',
      '7':  folder + 'cymbal/cymbal0007.mp3',
      '8':  folder + 'cymbal/cymbal0008.mp3',
      '9':  folder + 'cymbal/cymbal0009.mp3',
      '10': folder + 'cymbal/cymbal0010.mp3',
      '11': folder + 'cymbal/cymbal0011.mp3',
      '12': folder + 'cymbal/cymbal0012.mp3',
      '13': folder + 'cymbal/cymbal0013.mp3',
      '14': folder + 'cymbal/cymbal0014.mp3',
      '15': folder + 'cymbal/cymbal0015.mp3',
      '16': folder + 'cymbal/cymbal0016.mp3',
      '17': folder + 'cymbal/cymbal0017.mp3',
      '18': folder + 'cymbal/cymbal0018.mp3',
      '19': folder + 'cymbal/cymbal0019.mp3',
      '20': folder + 'cymbal/cymbal0020.mp3',
      '21': folder + 'cymbal/cymbal0021.mp3',
      '22': folder + 'cymbal/cymbal0022.mp3',
      '23': folder + 'cymbal/cymbal0023.mp3',
      '24': folder + 'cymbal/cymbal0024.mp3',
      '25': folder + 'cymbal/cymbal0025.mp3',
      '26': folder + 'cymbal/cymbal0026.mp3',
      '27': folder + 'cymbal/cymbal0027.mp3',
      '28': folder + 'cymbal/cymbal0028.mp3',
      '29': folder + 'cymbal/cymbal0029.mp3',
      '30': folder + 'cymbal/cymbal0030.mp3',
      '31': folder + 'cymbal/cymbal0031.mp3',
      '32': folder + 'cymbal/cymbal0032.mp3',
      '33': folder + 'cymbal/cymbal0033.mp3',
      '34': folder + 'cymbal/cymbal0034.mp3',
      '35': folder + 'cymbal/cymbal0035.mp3',
      '36': folder + 'cymbal/cymbal0036.mp3',
      '37': folder + 'cymbal/cymbal0037.mp3',
      '38': folder + 'cymbal/cymbal0038.mp3',
      '39': folder + 'cymbal/cymbal0039.mp3',
      '40': folder + 'cymbal/cymbal0040.mp3',
      '41': folder + 'cymbal/cymbal0041.mp3',
      '42': folder + 'cymbal/cymbal0042.mp3'
    },
    "Closed Hihat": {
      '1': folder + 'closed-hihat/closed-hihat0001.mp3',
      '2': folder + 'closed-hihat/closed-hihat0002.mp3',
      '3': folder + 'closed-hihat/closed-hihat0003.mp3',
      '4': folder + 'closed-hihat/closed-hihat0004.mp3'
    },
    "Open Hihat": {
      '1': folder + 'open-hihat/open-hihat0001.mp3',
      '2': folder + 'open-hihat/open-hihat0002.mp3',
      '3': folder + 'open-hihat/open-hihat0003.mp3',
      '4': folder + 'open-hihat/open-hihat0004.mp3',
      '5': folder + 'open-hihat/open-hihat0005.mp3',
      '6': folder + 'open-hihat/open-hihat0006.mp3',
      '7': folder + 'open-hihat/open-hihat0007.mp3'
    },
    "Low Conga": {
      '1': folder + 'low-conga/low-conga0001.mp3',
      '2': folder + 'low-conga/low-conga0002.mp3',
      '3': folder + 'low-conga/low-conga0003.mp3',
      '4': folder + 'low-conga/low-conga0004.mp3',
      '5': folder + 'low-conga/low-conga0005.mp3',
      '6': folder + 'low-conga/low-conga0006.mp3',
      '7': folder + 'low-conga/low-conga0007.mp3',
      '8': folder + 'low-conga/low-conga0008.mp3'
    },
    "Mid Conga": {
      '1': folder + 'mid-conga/mid-conga0001.mp3',
      '2': folder + 'mid-conga/mid-conga0002.mp3',
      '3': folder + 'mid-conga/mid-conga0003.mp3',
      '4': folder + 'mid-conga/mid-conga0004.mp3',
      '5': folder + 'mid-conga/mid-conga0005.mp3',
      '6': folder + 'mid-conga/mid-conga0006.mp3',
      '7': folder + 'mid-conga/mid-conga0007.mp3',
      '8': folder + 'mid-conga/mid-conga0008.mp3'
    },
    "High Conga": {
      '1': folder + 'hi-conga/hi-conga0001.mp3',
      '2': folder + 'hi-conga/hi-conga0002.mp3',
      '3': folder + 'hi-conga/hi-conga0003.mp3',
      '4': folder + 'hi-conga/hi-conga0004.mp3',
      '5': folder + 'hi-conga/hi-conga0005.mp3',
      '6': folder + 'hi-conga/hi-conga0006.mp3',
      '7': folder + 'hi-conga/hi-conga0007.mp3',
      '8': folder + 'hi-conga/hi-conga0008.mp3',
      '9': folder + 'hi-conga/hi-conga0009.mp3'
    },
    "Low Tom": {
      '1': folder + 'low-tom/low-tom0001.mp3',
      '2': folder + 'low-tom/low-tom0002.mp3',
      '3': folder + 'low-tom/low-tom0003.mp3',
      '4': folder + 'low-tom/low-tom0004.mp3',
      '5': folder + 'low-tom/low-tom0005.mp3',
      '6': folder + 'low-tom/low-tom0006.mp3',
      '7': folder + 'low-tom/low-tom0007.mp3',
      '8': folder + 'low-tom/low-tom0008.mp3'
    },
    "Mid Tom": {
      '1': folder + 'mid-tom/mid-tom0001.mp3',
      '2': folder + 'mid-tom/mid-tom0002.mp3',
      '3': folder + 'mid-tom/mid-tom0003.mp3',
      '4': folder + 'mid-tom/mid-tom0004.mp3',
      '5': folder + 'mid-tom/mid-tom0005.mp3',
      '6': folder + 'mid-tom/mid-tom0006.mp3'
    },
    "High Tom": {
      '1': folder + 'hi-tom/hi-tom0001.mp3',
      '2': folder + 'hi-tom/hi-tom0002.mp3',
      '3': folder + 'hi-tom/hi-tom0003.mp3',
      '4': folder + 'hi-tom/hi-tom0004.mp3',
      '5': folder + 'hi-tom/hi-tom0005.mp3',
      '6': folder + 'hi-tom/hi-tom0006.mp3',
      '7': folder + 'hi-tom/hi-tom0007.mp3'
    }
  };
  var soundNames = Object.keys(soundsData);
  if (Sounds.find().count() != soundNames.length) {
    for (var i = soundNames.length - 1; i >= 0; i--) {
      Meteor.call('addSound', {
        soundName: soundNames[i],
        variants: soundsData[ soundNames[i] ],
        privateSound: false
      });
    }
  }
  if (Rooms.find().count() != 1) {
    var room = Rooms.insert({name: 'home', tempo: 120, channelIds: []});
    for(var i = 0; i < soundNames.length; i++) {
      if (Channels.findOne({soundName: soundNames[i], roomId: room._id}) === undefined) {
        channelId = Meteor.call('addChannel', {
          numSteps: 16,
          roomId: room._id,
          channelName: name,
          position: i,
          volume: 0.5,
          soundName: soundNames[i],
          selectedSound: '1'
        });
        Meteor.call('addChannelToRoom', room, channelId);
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