// Data model for a channel in a sequencer

/*
  Each channel is a doc in the Channels collection:
  steps: array of stepIds in the channel
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
    Channels.insert({
      steps: stepArray,
      roomId: options.channelRoomId,
      volume: 1,
      name: options.channelName,
      soundUrl: options.channelSoundUrl,
      creatorId: this.userId
    });
  },
  removeChannel: function (options) {
    toRemove = Channels.findOne({_id: options.channelId});
    for (var i = 0; i < toRemove.steps.length; i++) {
      Steps.remove({_id: toRemove.steps[i]._id});
    }
    Channels.remove({_id: options.channelId});
  }
});