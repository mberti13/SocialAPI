const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate:[validateEmail, 'Please enter a valid email address!']
        },
        thoughts:[
            {
                type: String,
                ref: 'Thought'
            }
        ],
        friends:[
            {
                type: String
            }
        ]
    },
    {
        toJSON:{
            virtuals: true,
        }
    }
);
// TODO add virtuals to user for friend count

const user = model('User', UserSchema)

module.exports = user;