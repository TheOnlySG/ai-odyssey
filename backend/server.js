require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');
const { generateBlueprint } = require('./services/geminiService');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Main Generation Route
app.post('/api/generate', async (req, res) => {
    const { idea } = req.body;
    if (!idea) {
        return res.status(400).json({ error: "No idea provided" });
    }

    try {
        console.log(`Generating blueprint for: "${idea}"`);
        const generatedData = await generateBlueprint(idea);
        
        // Save to SQLite History
        const id = uuidv4();
        const jsonStr = JSON.stringify(generatedData);
        
        db.run(`INSERT INTO history (id, idea, generated_data) VALUES (?, ?, ?)`, [id, idea, jsonStr], function(err) {
            if (err) {
                console.error("Failed to save to database:", err);
                return res.json({ id, idea, data: generatedData });
            }
            res.json({ id, idea, data: generatedData });
        });

    } catch (error) {
        console.error("Generation error:", error);
        res.status(500).json({ error: "Failed to generate blueprint. Ensure API key is valid.", details: error.message });
    }
});

// Fetch History
app.get('/api/history', (req, res) => {
    db.all(`SELECT id, idea, created_at FROM history ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch history" });
        }
        res.json(rows);
    });
});

// Fetch single generation from History
app.get('/api/history/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM history WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch item" });
        }
        if (!row) return res.status(404).json({ error: "Not found" });
        
        try {
            row.data = JSON.parse(row.generated_data);
            delete row.generated_data; // cleanup payload
            res.json(row);
        } catch (e) {
            res.status(500).json({ error: "Failed to parse saved data" });
        }
    });
});

app.delete('/api/history/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM history WHERE id = ?`, [id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to delete" });
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
