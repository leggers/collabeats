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
    return true;
  }
});