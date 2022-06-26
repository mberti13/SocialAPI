const { Schema, models, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



// TODO: Create reaction schema 




const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => dateFormat(createdAt)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// TODO: add virtuals to schema for reaction count

const thought = model('Thought', ThoughtSchema);

module.exports = thought;