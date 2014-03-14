// Data model for a sound (sample) in the sequencer

/*
  Each sample is a doc in the Steps collection:
    name: sound name
    variants: an Object that stores variations of a sound (say, different pitch, or sustain or whatever),
      in the form { variantName: soundUrl, ... }
*/

// Sounds = new Meteor.Collection('sto')