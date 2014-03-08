// Data model for a room containing a sequencer

/*
  Each channel is a doc in the Rooms collection:
  channelIds: array of channelIds in the channel
  name: room name
  tempo: speed of the beat
*/

Rooms = new Meteor.Collection('rooms');

Rooms.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return false;
  }
});

Meteor.methods({
  addChannelToRoom: function (roomId, channelId) {
    Rooms.update({_id: roomId}, {$push: {channelIds: channelId}});
  },
  changeRoomTempo: function (roomId, tempo) {
    Rooms.update({_id: roomId}, {$set: {tempo: tempo}});
  },
  removeRoom: function (roomId) {
    room = Rooms.findOne({_id: roomId});
    for (var i = room.channelIds.length - 1; i >= 0; i--) {
      Meteor.call('removeChannel', room.channelIds[i]);
    }
    Rooms.remove({_id: roomId});
  }
});