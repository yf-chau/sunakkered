const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/token');


async function register (req, res) {
    try {
        const data = req.body;

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password
        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await User.create(data);

        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function login (req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username);
        console.log("User", user)
        const authenticated = await bcrypt.compare(data.password, user["password"]);
        console.log("Authentificated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }

    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

async function index(req, res) {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
};

async function show (req,res) {
    try{
        const id = parseInt(req.params.id)
        const user = await User.getOneByUserId(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const newUser = await User.create(data);
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
};

async function update (req, res) {
    try {
        const data = req.body;
        const Id = req.params.id
        const user = await User.getOneByUserId(Id);
        const result = await user.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

async function destroy (req, res) {
    try {
        const Id = req.params.id
        const user = await User.getOneByUserId(Id);
        const result = await user.destroy();
        res.status(204).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

///WIP///
async function getId(req, res) {
    try {
        const token = req.headers.token;
        const response = await Token.getOneByToken(token)
        const users_id = response.rows[0].users_id
        res.status(204).json({ "users_id": users_id });
    } catch (error) {
        res.status(404).json({ "error": error.message })
    }
}
///WIP///

module.exports = {
    index, show, create, update, destroy, register, login, getId
}
