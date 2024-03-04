import {
    pool
} from "../../db.js";

// post
export const studentsBaru = async (req, res) => {
    try {
        const result = await pool.query(
            "INSERT INTO students (name, generation) VALUES ($1, $2) RETURNING *",
            [req.body.name, req.body.generation]
        );
        res.json({
            student: result.rows[0],
            message: "Mahasiswa berhasil ditambahkan.",
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

//get

export const getAllStd = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

//get by id
export const getStdById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students WHERE id = $1", [
            req.params.id,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};


//update
export const updateStudents = async (req, res) => {
    try {
        await pool.query(
            "UPDATE students SET name = $1, generation = $2 WHERE id = $3",
            [req.body.name, req.body.generation, req.params.id]
        );
        res.status(200).json({
            message: "Mahasiswa berhasil ditambahkan.",
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};

// Delete student by ID

export const deleteStudentById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );
        res.status(200).json({
            message: "Mahasiswa berhasil dihapus.",
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
};
