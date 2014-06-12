Meteor.methods({
    changeRoom: function (name) {
        if (this.userId && Rooms.findOne({nmae: name}))
            Meteor.users.update(this.userId, {$set: {"profile.currentRoom": name}});
    }
});