const { User } = require('../models');

const userController = {
   getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    getSingleUser({ params }, res){
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '_id'
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: "No user found with this id."})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    createNewUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err))
    },
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id}, body, { new: true})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    deleteUser({ params}, res){
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id.'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    addFriend({ params, body }, res){
        console.log(body)
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body} },
            { new: true, runValidators: true }
        )
        .then(dbFriendData =>{
            if(!dbFriendData){
                res.status(404).json({ message: 'No user found at this id.'})
                return;
            }
            res.json(dbFriendData)
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendsId: params.friendsId } } },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    }

}

module.exports = userController;