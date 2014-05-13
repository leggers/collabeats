// Data model for a channel in a sequencer

/*
  Each channel is a doc in the Channels collection:
  stepIds: array of stepIds in the channel
  roomId: id of the room the channel belongs in
  soundName: name of the Sounds model for the channel
  selectedSound: name of the variant of the Sounds model
  creatorId: person who added the channel
  position: vertical ordering of channels in a room
  volume: channel volume
  muted: boolean indicating if channel is muted
*/

Channels = new Meteor.Collection('channels');

Channels.allow({
  insert: function () {
    // use addChannel method
    return false;
  },
  update: function () {
    return true;
  },
  remove: function () {
    // user removeChannel method
    return false;
  }
});

Meteor.methods({
  removeChannel: function (channelId) {
    var toRemove = Channels.findOne(channelId);
    Rooms.update({channelIds: {$in: [channelId]}}, {$pull: {channelIds: channelId}});
    if (toRemove) {
        for (var i = 0; i < toRemove.stepIds.length; i++) {
        Steps.remove({_id: toRemove.stepIds[i]});
      }
      Channels.remove(channelId);
    }
  },
  changeChannelVolume: function (channelId, delta) {
    var currentVolume = Channels.findOne(channelId).volume;
    var newVolume = currentVolume + delta;
    if (newVolume < 0.1) newVolume = 0;
    Channels.update(channelId, {$set: {volume: newVolume}});
  },
  changeSound: function (channelId, variantName) {
    Channels.update(channelId, {$set: {selectedSound: variantName}});
  },
  changePosition: function (channelId, newPosition) {
    Channels.update(channelId, {$set: {position: newPosition}});
  },
  setChannelMute: function (channelId, muted) {
    Channels.update(channelId, {$set: {muted: muted}});
  }
});