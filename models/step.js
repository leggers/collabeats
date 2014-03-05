// Data model for an individual step in a channel of the sequencer

/*
  Each step is a doc in the Steps collection:
    soundUrl: url string of the sample on the server
    active: boolean indicating if the sound should be played on that step
    lastChangerId: id of last person to change the step
    channelId: the id of the channel that has the sound
    ****there will be more here (once sound manipulation happens)*****
*/

Steps = new Meteor.Collection('steps');

Steps.allow({
  insert: function () {
    // no cowboy inserts; use addBeats method
    return true; // for a little while allow cowboy inserts
  },
  update: function (userId, step, fields, modifier) {
    //no coboy updates; use toggleStep method
    return false;
  },
  remove: function () {
    // no cowboy removes; use removeBeats method
    return true;
  }
});

Meteor.methods({
  toggleStep: function (stepId, activeValue) {
    Steps.update({_id: stepId}, {$set: {active: activeValue}});
  }
});