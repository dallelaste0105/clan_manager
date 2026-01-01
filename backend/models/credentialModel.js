import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

async function playerAlreadyExistsModel(name) {
    const user = await User.findOne({ name });
    return !!user;
}

async function signupModel(name, hashedPassword) {
    const user = new User({
        name,
        password: hashedPassword
    });

    await user.save();
    return true;
}

async function getPlayer(name) {
    const user = await User.findOne({ name });
    return user;
}

export default {
    playerAlreadyExistsModel,
    signupModel,
    getPlayer
};
