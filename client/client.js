////////////////////////////////////////////////////////////////////////////////
// Startup

Meteor.startup(function () {
  Deps.autorun(function () {
    var roomName = Session.get('roomName') || "home";
    Session.set('roomName', roomName);
    Meteor.subscribe('rooms', roomName, function () {
      var room = Rooms.findOne({name: Session.get('roomName')});
      tempo = room.tempo;
      var channelIds = room.channelIds;
      Session.set('channels', channelIds);
      Meteor.subscribe('channels', room._id, function () {
        Meteor.subscribe('steps', channelIds);
      });
    });
  });
  Session.set('looping', false);
});



////////////////////////////////////////////////////////////////////////////////
// Rooms

Template.room.room = function () {
  return Rooms.findOne({name: Session.get('roomName')});
};

var loopFunc = function(tickCount) {
  if (Session.get('looping')) {
    amplify.publish('tick', tickCount);
    setTimeout(function(){
      loopFunc((tickCount+= 1) % 16);
    }, getInterval());
  }
};

var tempo;

var getInterval = function() {
  interval = 60/tempo*1000/4;
  console.log(interval);
  return interval;
};

Template.room.events({
  'click button#play': function(event) {
    if (Session.get('looping')) {
      Session.set('looping', false);
      $('.icon-stop').hide();
      $('.icon-play').show();
    }
    else {
      Session.set('looping', true);
      loopFunc(0);
      $('.icon-play').hide();
      $('.icon-stop').show();
    }
  },
  'change input#tempo': function(event) {
    tempo = event.currentTarget.value;
    Meteor.call('changeRoomTempo', this._id, event.currentTarget.value);
  }
});



////////////////////////////////////////////////////////////////////////////////
// Channels

Template.channels.channels = function () {
  return Channels.find({_id: {$in: Session.get('channels')}});
};

Template.channels.created = function () {
  amplify.subscribe('tick', function (tickCount) {
    Channels.find().forEach(function (channel) {
      step = Steps.findOne({_id: channel.stepIds[tickCount]});
      if (step.active) Session.sounds[channel._id].play();
    });
  });
};

Template.channels.rendered = function () {
  sounds = Session.sounds || {};
  Session.sounds = sounds;
  Channels.find({roomId: Rooms.findOne({name: Session.get('roomName')})._id})
    .forEach(function (channel) {
      sounds[channel._id] = Session.sounds[channel._id] || new Howl({
        urls: [channel.soundUrl],
        onload: function() {console.log('loaded ' + channel.soundUrl);},
        onloaderror: function() {console.log('error loading ' + channel.soundUrl);},
      });
  });
  Session.sounds = sounds;
};

Template.channels.events({
  'click .step': function (event, template) {
    Meteor.call('toggleStep', this._id, !this.active);
    Session.sounds[this.channelId].play();
  }
});



////////////////////////////////////////////////////////////////////////////////
// Steps

Template.step.getStep = function (stepId) {
  return Steps.findOne({_id: stepId});
};