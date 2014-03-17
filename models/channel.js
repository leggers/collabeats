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
  addChannel: function (options) {
    var stepArray = [];
    for (var i = 0; i < options.numSteps; i++) {
      stepArray.push(Steps.insert({
        active: false,
        lastChangerId: this.userId,
        position: i
      }));
    }
    thisChannelId = Channels.insert({
      stepIds: stepArray,
      roomId: options.roomId,
      soundName: options.soundName,
      selectedSound: options.selectedSound,
      creatorId: this.userId,
      position: options.position,
      volume: options.volume
    });
    for (var j = 0; j < stepArray.length; j++) {
      Steps.update({_id: stepArray[j]}, {$set: {channelId: thisChannelId}});
    }
    return thisChannelId;
  },
  removeChannel: function (channelId) {
    toRemove = Channels.findOne({_id: channelId});
    Rooms.update({_id: channelId}, {$pull: {channelIds: channelId}});
    for (var i = 0; i < toRemove.stepIds.length; i++) {
      Steps.remove({_id: toRemove.stepIds[i]});
    }
    Channels.remove({_id: channelId});
  },
  changeChannelVolume: function (channelId, delta) {
    var currentVolume = Channels.findOne(channelId).volume;
    var newVolume = currentVolume + delta;
    if (newVolume < 0) newVolume = 0;
    Channels.update(channelId, {$set: {volume: newVolume}});
  },
  changeSound: function (channelId, variantName) {
    Channels.update(channelId, {$set: {selectedSound: variantName}});
  }
});