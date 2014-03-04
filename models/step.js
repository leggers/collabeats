// Data model for an individual step in an individual channel of the sequencer

/*
  Each step is a doc in the Steps collection:
    sound_url: url string of the sample on the server
    active: boolean indicating if the sound should be played on that step
    lastChanger: UUID of last person to change the step
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
    return false;
  }
});

Meteor.methods({
  toggleStep: function (stepId, activeValue) {
    Steps.update({_id: stepId}, {lastChanger: this.userId, active: activeValue});
  }
});