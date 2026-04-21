const pool = require('../config/db');

const getAllUsers = async (search = '') => {
    const { rows } = await pool.query(
        "SELECT id, name, email, role FROM users WHERE name LIKE $1",
        [`%${search}%`]
    );
    return rows;
};

const getUserById = async (id) => {
    const { rows } = await pool.query(
        "SELECT id, name, email, role FROM users WHERE id = $1",
        [id]
    );
    return rows[0];
};

const createUser = async (name, email, password) => {
    const { rows } = await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id",
        [name, email, password]
    );
    return rows[0].id;
};

const updateUser = async (id, name, email, password) => {
    const { rowCount } = await pool.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, password, id]
    );
    return rowCount > 0;
};

const deleteUser = async (id) => {
    await pool.query(
        "DELETE FROM users WHERE id = $1",
        [id]
    );
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
