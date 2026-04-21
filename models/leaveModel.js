const pool = require('../config/db');

const getAllLeaves = async () => {
    const { rows } = await pool.query("SELECT * FROM leaves");
    return rows;
};

const getLeavesByUser = async (user_id) => {
    const { rows } = await pool.query("SELECT * FROM leaves WHERE user_id = $1", [user_id]);
    return rows;
};

const createLeave = async (user_id, start_date, end_date, reason) => {
    const { rows } = await pool.query(
        "INSERT INTO leaves (user_id, start_date, end_date, reason) VALUES ($1, $2, $3, $4) RETURNING id",
        [user_id, start_date, end_date, reason]
    );
    return rows[0].id;
};

const updateLeaveStatus = async (id, status) => {
    const { rowCount } = await pool.query(
        "UPDATE leaves SET status = $1 WHERE id = $2",
        [status, id]
    );
    return rowCount > 0;
};

const deleteLeave = async (id) => {
    await pool.query("DELETE FROM leaves WHERE id = $1", [id]);
};

const getLeaveById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM leaves WHERE id = $1", [id]);
    return rows[0];
};

module.exports = { getAllLeaves, getLeavesByUser, createLeave, updateLeaveStatus, deleteLeave, getLeaveById };
