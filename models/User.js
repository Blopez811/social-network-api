const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required",
            trim: true
        },
        email: {
            type: String,
            required: 'Email address is required',
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [ThoughtSchema],
        friends: [UserSchema]
    }
)