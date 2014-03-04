// Data model for an individual step in an individual channel of the sequencer

/*
  Each step is a doc in the Steps collection:
    sound_url: url string of the sample on the server
    active: boolean indicating if the sound should be played on that step
    last_change: UUID of last person to change the step
    ****there will be more here (once sound manipulation happens)*****
*/

Steps = new Meteor.Collection('steps');

