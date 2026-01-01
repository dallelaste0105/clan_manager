import db from "../db.js";

async function userAlreadyExistsModel(name) {
    return new Promise((resolve, reject) => {
        const queryOne = "SELECT name FROM users WHERE name = ?";
        db.query(queryOne, [name], (errorOne, resultOne) => {
            if (errorOne) {
                return reject(false);
            }
            return resolve(true);
        })
    })
}

async function signupModel(name, hashedPassword) {
    return new Promise((resolve, reject) => {
        const queryOne = "INSERT INTO users (name, password) VALUES (?, ?)";
        db.query(queryOne, [name, hashedPassword], (errorOne, resultOne) => {
            if (errorOne) {
                return reject(false);
            }
            return resolve(true);
        })
    })
}

export default {
    userAlreadyExistsModel,
    signupModel
};