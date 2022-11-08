const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        hash: String,
        salt: String
    }, {timestamps: true}
);

/* passportLocalMongoose takes our User schema and sets up a passport "local" authentication strategy using our email as the username field */
UserSchema.plugin(passportLocalMongoose, { usernameFields: ["email", "username"] });

module.exports = mongoose.model("User", UserSchema);
