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

const WorldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seed: {
        type: String,
        required: true
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const World = mongoose.model("World", WorldSchema);


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

async function createWorldModel(playerId, worldName) {
    function createSeed() {
        let seed = "";
        for (let i = 0; i < 20; i++) {
            seed += Math.floor(Math.random() * 10);
        }
        return seed;
    }
    const seed = createSeed();
    return await World.create({
        name: worldName,
        seed: seed,
        playerId: playerId
    });
}

async function getWorldsModel(playerId) {
    const yourWorlds = World.find({playerId:playerId});
    return (await yourWorlds).map;
}

export default {
    playerAlreadyExistsModel,
    signupModel,
    getPlayer,
    logoutModel,
    createWorldModel,
    getWorldsModel
};