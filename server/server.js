Meteor.startup(function () {
  var soundsData = {
    "Kick": {
      '1':  'bass-drum/kickdrum0001.mp3',
      '2':  'bass-drum/kickdrum0002.mp3',
      '3':  'bass-drum/kickdrum0003.mp3',
      '4':  'bass-drum/kickdrum0004.mp3',
      '5':  'bass-drum/kickdrum0005.mp3',
      '6':  'bass-drum/kickdrum0006.mp3',
      '7':  'bass-drum/kickdrum0007.mp3',
      '8':  'bass-drum/kickdrum0008.mp3',
      '9':  'bass-drum/kickdrum0009.mp3',
      '10': 'bass-drum/kickdrum0010.mp3',
      '11': 'bass-drum/kickdrum0011.mp3',
      '12': 'bass-drum/kickdrum0012.mp3',
      '13': 'bass-drum/kickdrum0013.mp3',
      '14': 'bass-drum/kickdrum0014.mp3',
      '15': 'bass-drum/kickdrum0015.mp3',
      '16': 'bass-drum/kickdrum0016.mp3',
      '17': 'bass-drum/kickdrum0017.mp3',
      '18': 'bass-drum/kickdrum0018.mp3',
      '19': 'bass-drum/kickdrum0019.mp3',
      '20': 'bass-drum/kickdrum0020.mp3',
      '21': 'bass-drum/kickdrum0021.mp3',
      '22': 'bass-drum/kickdrum0022.mp3',
      '23': 'bass-drum/kickdrum0023.mp3'
    },
    "Snare": {
      '1': 'snare-drum/snaredrum0001.mp3',
      '2': 'snare-drum/snaredrum0002.mp3',
      '3': 'snare-drum/snaredrum0003.mp3',
      '4': 'snare-drum/snaredrum0004.mp3',
      '5': 'snare-drum/snaredrum0005.mp3',
      '6': 'snare-drum/snaredrum0006.mp3',
      '7': 'snare-drum/snaredrum0007.mp3',
      '8': 'snare-drum/snaredrum0008.mp3',
      '9': 'snare-drum/snaredrum0009.mp3',
      '10': 'snare-drum/snaredrum0010.mp3',
      '11': 'snare-drum/snaredrum0011.mp3',
      '12': 'snare-drum/snaredrum0012.mp3',
      '13': 'snare-drum/snaredrum0013.mp3',
      '14': 'snare-drum/snaredrum0014.mp3',
      '15': 'snare-drum/snaredrum0015.mp3',
      '16': 'snare-drum/snaredrum0016.mp3',
      '17': 'snare-drum/snaredrum0017.mp3',
      '18': 'snare-drum/snaredrum0018.mp3',
      '19': 'snare-drum/snaredrum0019.mp3',
      '20': 'snare-drum/snaredrum0020.mp3',
      '21': 'snare-drum/snaredrum0021.mp3',
      '22': 'snare-drum/snaredrum0022.mp3',
      '23': 'snare-drum/snaredrum0023.mp3',
      '24': 'snare-drum/snaredrum0024.mp3',
      '25': 'snare-drum/snaredrum0025.mp3',
      '26': 'snare-drum/snaredrum0026.mp3',
      '27': 'snare-drum/snaredrum0027.mp3',
      '28': 'snare-drum/snaredrum0028.mp3',
      '29': 'snare-drum/snaredrum0029.mp3',
      '30': 'snare-drum/snaredrum0030.mp3',
      '31': 'snare-drum/snaredrum0031.mp3',
      '32': 'snare-drum/snaredrum0032.mp3',
      '33': 'snare-drum/snaredrum0033.mp3',
      '34': 'snare-drum/snaredrum0034.mp3',
      '35': 'snare-drum/snaredrum0035.mp3',
      '36': 'snare-drum/snaredrum0036.mp3',
      '37': 'snare-drum/snaredrum0037.mp3',
      '38': 'snare-drum/snaredrum0038.mp3',
      '39': 'snare-drum/snaredrum0039.mp3',
      '40': 'snare-drum/snaredrum0040.mp3',
      '41': 'snare-drum/snaredrum0041.mp3',
      '42': 'snare-drum/snaredrum0042.mp3',
      '43': 'snare-drum/snaredrum0043.mp3',
      '44': 'snare-drum/snaredrum0044.mp3',
      '45': 'snare-drum/snaredrum0045.mp3'
    },
    "Clap": {
      '1': 'misc/clap.mp3'
    },
    "Rimshot": {
      '1': 'misc/rimshot.mp3'
    },
    "Clav": {
      '1': 'misc/clav.mp3'
    },
    "Maraca": {
      '1': 'misc/maraca.mp3'
    },
    "Cowbell": {
      '1': 'misc/cowbell.mp3'
    },
    "Cymbal": {
      '1': 'cymbal/cymbal0001.mp3',
      '2': 'cymbal/cymbal0002.mp3',
      '3': 'cymbal/cymbal0003.mp3',
      '4': 'cymbal/cymbal0004.mp3',
      '5': 'cymbal/cymbal0005.mp3',
      '6': 'cymbal/cymbal0006.mp3',
      '7': 'cymbal/cymbal0007.mp3',
      '8': 'cymbal/cymbal0008.mp3',
      '9': 'cymbal/cymbal0009.mp3',
      '10': 'cymbal/cymbal00010.mp3',
      '11': 'cymbal/cymbal00011.mp3',
      '12': 'cymbal/cymbal00012.mp3',
      '13': 'cymbal/cymbal00013.mp3',
      '14': 'cymbal/cymbal00014.mp3',
      '15': 'cymbal/cymbal00015.mp3',
      '16': 'cymbal/cymbal00016.mp3',
      '17': 'cymbal/cymbal00017.mp3',
      '18': 'cymbal/cymbal00018.mp3',
      '19': 'cymbal/cymbal00019.mp3',
      '20': 'cymbal/cymbal0020.mp3',
      '21': 'cymbal/cymbal0021.mp3',
      '22': 'cymbal/cymbal0022.mp3',
      '23': 'cymbal/cymbal0023.mp3',
      '24': 'cymbal/cymbal0024.mp3',
      '25': 'cymbal/cymbal0025.mp3',
      '26': 'cymbal/cymbal0026.mp3',
      '27': 'cymbal/cymbal0027.mp3',
      '28': 'cymbal/cymbal0028.mp3',
      '29': 'cymbal/cymbal0029.mp3',
      '30': 'cymbal/cymbal0030.mp3',
      '31': 'cymbal/cymbal0031.mp3',
      '32': 'cymbal/cymbal0032.mp3',
      '33': 'cymbal/cymbal0033.mp3',
      '34': 'cymbal/cymbal0034.mp3',
      '35': 'cymbal/cymbal0035.mp3',
      '36': 'cymbal/cymbal0036.mp3',
      '37': 'cymbal/cymbal0037.mp3',
      '38': 'cymbal/cymbal0038.mp3',
      '39': 'cymbal/cymbal0039.mp3',
      '40': 'cymbal/cymbal0040.mp3',
      '41': 'cymbal/cymbal0041.mp3',
      '42': 'cymbal/cymbal0042.mp3'
    },
    "Closed Hihat": {
      '1': 'closed-hihat/closed-hihat0001.mp3',
      '2': 'closed-hihat/closed-hihat0002.mp3',
      '3': 'closed-hihat/closed-hihat0003.mp3',
      '4': 'closed-hihat/closed-hihat0004.mp3'
    },
    "Open Hihat": {
      '1': 'open-hihat/open-hihat0001.mp3',
      '2': 'open-hihat/open-hihat0002.mp3',
      '3': 'open-hihat/open-hihat0003.mp3',
      '4': 'open-hihat/open-hihat0004.mp3',
      '5': 'open-hihat/open-hihat0005.mp3',
      '6': 'open-hihat/open-hihat0006.mp3',
      '7': 'open-hihat/open-hihat0007.mp3'
    },
    "Low Conga": {
      '1': 'low-conga/low-conga0001.mp3',
      '2': 'low-conga/low-conga0002.mp3',
      '3': 'low-conga/low-conga0003.mp3',
      '4': 'low-conga/low-conga0004.mp3',
      '5': 'low-conga/low-conga0005.mp3',
      '6': 'low-conga/low-conga0006.mp3',
      '7': 'low-conga/low-conga0007.mp3',
      '8': 'low-conga/low-conga0008.mp3'
    },
    "Mid Conga": {
      '1': 'mid-conga/mid-conga0001.mp3',
      '2': 'mid-conga/mid-conga0002.mp3',
      '3': 'mid-conga/mid-conga0003.mp3',
      '4': 'mid-conga/mid-conga0004.mp3',
      '5': 'mid-conga/mid-conga0005.mp3',
      '6': 'mid-conga/mid-conga0006.mp3',
      '7': 'mid-conga/mid-conga0007.mp3',
      '8': 'mid-conga/mid-conga0008.mp3'
    },
    "High Conga": {
      '1': 'hi-conga/hi-conga0001.mp3',
      '2': 'hi-conga/hi-conga0002.mp3',
      '3': 'hi-conga/hi-conga0003.mp3',
      '4': 'hi-conga/hi-conga0004.mp3',
      '5': 'hi-conga/hi-conga0005.mp3',
      '6': 'hi-conga/hi-conga0006.mp3',
      '7': 'hi-conga/hi-conga0007.mp3',
      '8': 'hi-conga/hi-conga0008.mp3',
      '9': 'hi-conga/hi-conga0009.mp3'
    },
    "Low Tom": {
      '1': 'low-tom/low-tom0001.mp3',
      '2': 'low-tom/low-tom0002.mp3',
      '3': 'low-tom/low-tom0003.mp3',
      '4': 'low-tom/low-tom0004.mp3',
      '5': 'low-tom/low-tom0005.mp3',
      '6': 'low-tom/low-tom0006.mp3',
      '7': 'low-tom/low-tom0007.mp3',
      '8': 'low-tom/low-tom0008.mp3'
    },
    "Mid Tom": {
      '1': 'mid-tom/mid-tom0001.mp3',
      '2': 'mid-tom/mid-tom0002.mp3',
      '3': 'mid-tom/mid-tom0003.mp3',
      '4': 'mid-tom/mid-tom0004.mp3',
      '5': 'mid-tom/mid-tom0005.mp3',
      '6': 'mid-tom/mid-tom0006.mp3'
    },
    "High Tom": {
      '1': 'hi-tom/hi-tom0001.mp3',
      '2': 'hi-tom/hi-tom0002.mp3',
      '3': 'hi-tom/hi-tom0003.mp3',
      '4': 'hi-tom/hi-tom0004.mp3',
      '5': 'hi-tom/hi-tom0005.mp3',
      '6': 'hi-tom/hi-tom0006.mp3',
      '7': 'hi-tom/hi-tom0007.mp3'
    }
  };
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
          channelName: name,
          position: i,
          volume: 0.5
        });
        Meteor.call('addChannelToRoom', room, channelId);
      }
      Channels.update({soundUrl: folder + urls[i]}, {$set: {roomId: room._id}});
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