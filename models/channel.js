// Data model for a channel in a sequencer

/*
  Each channel is a doc in the Channels collection:
  stepIds: array of stepIds in the channel
  roomId: id of the room the channel belongs in
  volume: volume of the channel
  name: instrument name
  soundUrl: url of the sound file for the channel
  creatorId: person who added the channel
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
      stepArray.push(Steps.insert({soundUrl: options.channelSoundUrl, active: false, lastChangerId: this.userId}));
    }
    thisChannelId = Channels.insert({
      stepIds: stepArray,
      roomId: options.channelRoomId,
      volume: 1,
      name: options.channelName,
      soundUrl: options.channelSoundUrl,
      creatorId: this.userId
    });
    for (var i = 0; i < stepArray.length; i++) {
      Steps.update({_id: stepArray[i]}, {channelId: thisChannelId});
    }
  },
  removeChannel: function (channelId) {
    toRemove = Channels.findOne({_id: channelId});
    for (var i = 0; i < toRemove.stepIds.length; i++) {
      Steps.remove({_id: toRemove.stepIds[i]});
    }
    Channels.remove({_id: channelId});
  }
});