const { Schema, models, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



// TODO: Create reaction schema 
const ReactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody:{
        type: String,
        required: true,
        max: 280
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON:{
        getters: true
    }
}
);



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
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const thought = model('Thought', ThoughtSchema);

module.exports = thought;