const db = require('../database/connect');

class User {

    constructor({ user_id, username, password, first_name, last_name, phone_number, email, above18, borough }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.above18 = above18;
        this.borough = borough;
        }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, first_name, last_name, phone_number, email, above18, borough } = data;
        let response = await db.query("INSERT INTO user_account (username, password, first_name, last_name, phone_number, email, above18, borough) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id;",
            [username, password, first_name, last_name, phone_number, email, above18, borough]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;
