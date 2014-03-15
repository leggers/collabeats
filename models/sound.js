// Data model for a sound (sample) in the sequencer

/*
  Each sample is a doc in the Steps collection:
    name: sound name
    variants: an Object that stores variations of a sound (say, different pitch, or sustain or whatever),
      in the form { variantName: soundUrl, ... }
    owner: ID of person who created the sound
    private: only usable in a room where the owner is the room owner
      (else pull the sound from the room)
*/

// Sounds = new Meteor.Collection('sto')