const pool = require('../config/db');

const getAllLeaves = async (user_id = null) => {
    let query = "SELECT l.*, u.name as user_name FROM leaves l JOIN users u ON l.user_id = u.id";
    const params = [];
    if (user_id) {
        query += " WHERE l.user_id = $1";
        params.push(user_id);
    }
    const { rows } = await pool.query(query, params);
    return rows;
};

const getLeaveSummary = async () => {
    const { rows } = await pool.query(`
        SELECT 
            u.id,
            u.name,
            COUNT(CASE WHEN l.status = 'applied' THEN 1 END) AS applied,
            COUNT(CASE WHEN l.status = 'approved' THEN 1 END) AS approved,
            COUNT(CASE WHEN l.status = 'rejected' THEN 1 END) AS rejected
        FROM users u
        LEFT JOIN leaves l ON u.id = l.user_id
        GROUP BY u.id, u.name
    `);
    return rows;
};

const updateLeaveStatus = async (id, status) => {
    const { rowCount } = await pool.query(
        "UPDATE leaves SET status = $1 WHERE id = $2",
        [status, id]
    );
    return rowCount > 0;
};

module.exports = { getAllLeaves, getLeaveSummary, updateLeaveStatus };
