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
    },
    active: {
        type: Boolean,
        required: true,
        default: false // Adicionei default para evitar erro no signup
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
        password: hashedPassword,
        active: false
    });

    await user.save();
    return true;
}

async function getPlayer(name) {
    const user = await User.findOne({ name }); 
    
    if (user) {
        await User.updateOne({ _id: user._id }, { active: true });
        return user;
    }
    return null;
}

async function logoutModel(userId) {
    const result = await User.updateOne({ _id: userId }, { active: false });
    return result.modifiedCount > 0 || result.matchedCount > 0;
}

export default {
    playerAlreadyExistsModel,
    signupModel,
    getPlayer,
    logoutModel
};