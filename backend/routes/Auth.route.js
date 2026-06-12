const express = require('express');
const router = express.Router();

router.post("/add_new_user", (req, res) => {
    try {
        const checkCorrectData = userRegistrationSchema.safeParse(req.body);

        if (!checkCorrectData.success) {
            return res.status(400).json({ 
                error: "Некоректні вхідні дані", 
                details: checkCorrectData.error.flatten().fieldErrors 
            });
        }

        const { first_name, last_name, email, phone_number, password } = checkCorrectData.data;

        const password_hash = await bcrypt.hash(password, 10);

        const userData = {
            full_name: `${first_name.trim()} ${last_name.trim()}`,
            email: email.toLowerCase().trim(),
            phone_number: phone_number,
            password_hash: password_hash
        };

        const columns = Object.keys(userData); 
        const values = Object.values(userData);
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

        const query = `
            INSERT INTO users (${columns.map(col => `"${col}"`).join(', ')})
            VALUES (${placeholders})
            RETURNING id
        `;

        const result = await pool.query(query, values);

        const userId = result.rows[0].id;

        const token = jwt.sign(
            {
                userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.cookie("userToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true
        });

    } catch (error) {
        console.error("Authorization error:", error);

        if (error.code === '23505') {
            return res.status(409).json({ error: "User already exists" });
        }

        return res.status(500).json({ error: "Server error" });
    }
});

router.get("/me", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            authenticated: false
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return res.json({
            authenticated: true,
            userId: decoded.userId
        });

    } catch {
        return res.status(401).json({
            authenticated: false
        });
    }
});

module.exports = router;