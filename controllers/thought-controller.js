const { Thought, User } = require('../models');

const thoughtController ={
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    createThought({ body }, res) {
        console.log(body, 'body')
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(thoughtData => {
                console.log(thoughtData, 'thoughtdata')
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No Thought with this id!' })
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }

}