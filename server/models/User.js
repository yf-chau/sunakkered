const db = require('../database/connect')

class User {

    constructor ({users_id, username, first_name, last_name, phone_number, email, above18, borough, password, image_url}) {
        this.id = users_id;
        this.name = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.above18 = above18;
        this.borough = borough;
        this.password = password;
        this.image_url = image_url;
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM users ORDER BY users_id")
        if (response.rows.length === 0) {
            throw new Error("Users not found.")
        }
        return response.rows.map(u => new User(u));
    }

    static async getOneByUserId(id) {
        const response = await db.query("SELECT * FROM users WHERE users_id = $1;", [id]); 
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, first_name, last_name, phone_number, email, above18, borough, password, image_url } = data;
        const response = await db.query('INSERT INTO users (username, first_name, last_name, phone_number, email, above18, borough, password, image_url ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *;', [username, first_name, last_name, phone_number, email, above18, borough, password, image_url])
        const userID = response.rows[0].users_id;
        const newUser = await User.getOneByUserId(userID)
        return newUser
    }

    async update(data) {
        const { username, first_name, last_name, phone_number, email, above18,  borough, password, image_url } = data;
        const response = await db.query("UPDATE users SET username = $1, first_name = $2, last_name = $3, phone_number = $4, email = $5, above18 = $6, borough = $7, password = $8, image_url = $9 WHERE users_id = $10 RETURNING *;", [username, first_name, last_name, phone_number, email, above18,  borough, password, image_url, this.id]);
        const userId = response.rows[0].users_id
        const newUser = await User.getOneByUserId(userId)
        return newUser
    }

    async destroy() {
        const response = await db.query ('DELETE FROM users WHERE users_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete user.")
        }
        return new User(response.rows[0]);
    }

}

module.exports = User;