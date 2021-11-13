const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dataFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Cannot submit a blank reaction, input required',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is required!'
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    
    },
    {
        toJSON: {
            getter: true
        }
    }
)


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must write something to submit a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is required!',
            reactions: [ReactionSchema]
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;