require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');
const { generateBlueprint, chatWithBlueprint } = require('./services/geminiService');

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

// Fetch History with aggregate metrics
app.get('/api/history', (req, res) => {
    db.all(`SELECT id, idea, created_at, generated_data FROM history ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch history" });
        }
        // Map rows to include lightweight metrics to power analytics, but omit the massive generated_data payload
        const processedRows = rows.map(row => {
            let metrics = { healthScore: 0, category: 'Unknown', mvpFeaturesCount: 0 };
            try {
                if (row.generated_data) {
                    const data = JSON.parse(row.generated_data);
                    metrics.healthScore = data?.metrics?.healthScore || 0;
                    metrics.mvpFeaturesCount = data?.metrics?.mvpFeaturesCount || 0;
                    
                    // Simple logic to extract a category or use default
                    if (data?.features && data.features.length > 0) {
                        metrics.category = data.features[0].category || 'General';
                    }
                }
            } catch (e) {
                // Ignore parse errors for badly formatted historical data
            }
            
            return {
                id: row.id,
                idea: row.idea,
                created_at: row.created_at,
                ...metrics
            };
        });
        
        res.json(processedRows);
    });
});

// Chat with AI Assistant
app.post('/api/chat', async (req, res) => {
    const { message, blueprintContext, history } = req.body;
    if (!message) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const responseText = await chatWithBlueprint(blueprintContext, history, message);
        res.json({ reply: responseText });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: "Failed to generate AI response" });
    }
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
