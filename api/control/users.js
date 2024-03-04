import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { pool } from "../../db.js";

export async function register(req, res) {
    const { username, password } = req.body;
    try {
        const check = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
        if (check.rows.length > 0) {
            return res.status(400).json({
                message: "Username sudah digunakan"
            });
        } else {
            const hashedPassword = await argon2.hash(password);
            await pool.query(`INSERT INTO users(username, password) VALUES('${username}', '${hashedPassword}')`);
            return res.status(201).json({
                status: "success",
                message: "Berhasil menambahkan data",
                data: { username }
            });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
        if (user.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        const passwordMatch = await argon2.verify(user.rows[0].password, password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }
        const token = jwt.sign({ userId: user.rows[0]._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
