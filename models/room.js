// Data model for a room containing a sequencer

/*
  Each channel is a doc in the Rooms collection:
  channelIds: array of channelIds in the channel
  name: room name
  tempo: speed of the beat
  swing: "swing" amount (delays e and a 16ths)
    explained super well: http://www.attackmagazine.com/technique/passing-notes/daw-drum-machine-swing/
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
    if (tempo <= 300 && tempo > 0) Rooms.update({_id: roomId}, {$set: {tempo: tempo}});
  },
  deltaRoomTempo: function (roomId, delta) {
    Meteor.call('changeRoomTempo', roomId, Rooms.findOne(roomId).tempo + delta);
  },
  removeRoom: function (roomId) {
    room = Rooms.findOne({_id: roomId});
    for (var i = room.channelIds.length - 1; i >= 0; i--) {
      Meteor.call('removeChannel', room.channelIds[i]);
    }
    Rooms.remove({_id: roomId});
  },
  setSwing: function (roomId, swing) {
    if (swing > 0.8 && swing < 1.2) Rooms.update(roomId, {$set: {swing: swing}});
  },
  addRoom: function (name) {
    room = Rooom.insert({name: name, tempo: 120});

  }
});