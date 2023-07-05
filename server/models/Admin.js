const db = require('../database/connect')

class Admin {
    constructor({
        admin_id, username, admin_first_name, admin_last_name, password}) {
            this.admin_id = admin_id;
            this.username = username;
            this.admin_first_name = admin_first_name;            
            this.admin_last_name = admin_last_name;
            this.password = password;
        }

static async getAll(){
    const response = await db.query("SELECT * FROM admin ORDER BY admin_id");
    if(response.rows.length === 0) {
        throw new Error ("Admin not found.")
    }
    return response.rows.map(a => new Admin(a))
}

static async getOneByAdminId(id) {
    const response = await db.query("SELECT * FROM admin WHERE admin_id = $1;", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate admin.")
    } 
    return new Admin(response.rows[0]);
}
static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM admin WHERE username = $1;", [username]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user.")
    }
    return new Admin(response.rows[0]);
}
static async create(data) {
    const {username, admin_first_name, admin_last_name, password} = data;
    const response = await db.query('INSERT INTO admin( username, admin_first_name, admin_last_name, password) VALUES ($1, $2, $3, $4) RETURNING *;',[ username, admin_first_name, admin_last_name, password]);
    const adminID = response.rows[0].admin_id;
    const newAdmin = await Admin.getOneByAdminId(adminID)
    return newAdmin
}
async update(data) {
    const { username, admin_first_name, admin_last_name, password} = data;
    const response = await db.query("UPDATE admin SET username = $1, admin_first_name = $2, admin_last_name = $3, password= $4 WHERE admin_id = $5 RETURNING *;",[ username, admin_first_name, admin_last_name, password, this.admin_id]);
    const adminId = response.rows[0].admin_id;
    const newAdmin = await Admin.getOneByAdminId(adminId)
    return newAdmin
}
async destroy() {
    const response = await db.query ('DELETE FROM admin WHERE admin_id = $1 RETURNING *;',[this.admin_id]);
    if(response.rows.length != 1) {
        throw new Error("Unable to delete user.")
    }
    return new Admin(response.rows[0]);
}
}

module.exports = Admin;
