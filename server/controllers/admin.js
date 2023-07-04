const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');
const Token = require('../models/token');


async function register (req, res) {
    try {
        const data = req.body;

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        // Hash the password
        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await Admin.create(data);

        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function login (req, res) {
    const data = req.body;
    try {
        const admin = await Admin.getOneByUsername(data.username);
        console.log("Admin", admin)
        const authenticated = await bcrypt.compare(data.password, admin["password"]);
        console.log("Authentificated", authenticated)
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(admin.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
        
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

async function index(req, res) {
    try {
        const admins = await Admin.getAll();
        res.status(200).json(admins);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
};

async function show (req,res) {
    try{
        const id = parseInt(req.params.id)
        const admin = await Admin.getOneByUserId(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const newAdmin = await Admin.create(data);
        res.status(201).json(newAdmin);
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
};

async function update (req, res) {
    try {
        const data = req.body;
        const Id = req.params.id
        const admin = await Admin.getOneByUserId(Id);
        const result = await admin.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

async function destroy (req, res) {
    try {
        const Id = req.params.id
        const admin = await Admin.getOneByUserId(Id);
        const result = await admin.destroy();
        res.status(204).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};


module.exports = {
  index, show, create, update, destroy, register, login
}
