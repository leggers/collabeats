// Data model for a sound (sample) in the sequencer

/*
  Each sample is a doc in the Steps collection:
    name: sound name (must be unique)
    variants: an Array that stores variations of a sound (say, different pitch, or sustain or whatever),
      in the form {variantName: soundUrl, ...}
    ownerId: ID of person who created the sound
    privateSound: only usable in a room where the owner is the room owner
      (else pull the sound from the room)
*/

Sounds = new Meteor.Collection('sounds');

Sounds.allow({
  insert: function () {
    // no cowboy inserts; use createSound method
    return true; // for a little while allow cowboy inserts
  },
  update: function (userId, step, fields, modifier) {
    //no coboy updates; use various update methods
    return false;
  },
  remove: function () {
    // no cowboy removes; use removeSound method
    return false;
  }
});

Meteor.methods({
  addSound: function (options) {
    if (Sounds.findOne({name: options.name}) === undefined) {
      Sounds.insert({
        ownerId: this.userId,
        name: options.soundName,
        variants: options.variants,
        privateSound: options.privateSound
      });
    }
  },
  addVariant: function (soundId, variantName, variantUrl) {
    sound = Sounds.findOne(soundId);
    if (sound.ownerId == this.userId) {
      Sounds.update(soundId, {$addToSet: {variantName: variantUrl}});
    }
  }
});