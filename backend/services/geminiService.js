const { GoogleGenAI, Type } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// We need a structured schema for SpecForge to ensure zero-parse errors on the frontend UI.
const schema = {
  type: Type.OBJECT,
  properties: {
    prd: {
        type: Type.OBJECT,
        properties: {
            productName: { type: Type.STRING, description: "A catchy, short name for the product idea" },
            tagline: { type: Type.STRING, description: "A one-sentence impact statement" },
            problemStatement: { type: Type.STRING, description: "A multi-paragraph, detailed explanation of the challenge and current state, explicitly naming the product." },
            userPainPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 distinct, granular user frustrations" },
            marketGap: { type: Type.STRING, description: "Analysis of why current solutions are insufficient." },
            marketOpportunity: { type: Type.STRING, description: "Why now? The specific market opening." },
            targetPersona: { type: Type.STRING },
            targetPersonaImageText: { type: Type.STRING },
            keyObjectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific tactical goals" },
            coreHypothesis: { type: Type.STRING, description: "The central bet this product is making." },
            mitigations: { 
                type: Type.ARRAY, 
                items: { 
                    type: Type.OBJECT,
                    properties: {
                        risk: { type: Type.STRING },
                        solution: { type: Type.STRING }
                    }
                },
                description: "Potential risks and how they will be mitigated"
            },
            longTermVision: { type: Type.STRING, description: "The future roadmap beyond V1" },
            technicalSpec: {
                type: Type.OBJECT,
                properties: {
                    techStack: {
                        type: Type.OBJECT,
                        properties: {
                            frontend: { type: Type.STRING },
                            backend: { type: Type.STRING },
                            database: { type: Type.STRING },
                            infrastructure: { type: Type.STRING }
                        }
                    },
                    databaseArchitecture: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                table: { type: Type.STRING },
                                description: { type: Type.STRING }
                            }
                        }
                    },
                    apiIntegrations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                service: { type: Type.STRING },
                                purpose: { type: Type.STRING }
                            }
                        }
                    },
                    securityModel: { type: Type.STRING, description: "Detailed security protocols (Auth, Encryption, Compliance)" }
                }
            },
            successBaseline: { type: Type.STRING },
            successTarget: { type: Type.STRING }
        }
    },
    metrics: {
        type: Type.OBJECT,
        properties: {
            healthScore: { type: Type.INTEGER, description: "A score from 0-100 indicating viability" },
            buildTimeWeeks: { type: Type.STRING, description: "Estimated weeks to build (e.g., '6-8')" },
            competitorsCount: { type: Type.INTEGER },
            mvpFeaturesCount: { type: Type.INTEGER }
        }
    },
    radarAnalysis: {
        type: Type.OBJECT,
        properties: {
            utility: { type: Type.INTEGER, description: "0-10" },
            marketSize: { type: Type.INTEGER, description: "0-10" },
            defensibility: { type: Type.INTEGER, description: "0-10" },
            monetization: { type: Type.INTEGER, description: "0-10" },
            techRisk: { type: Type.INTEGER, description: "0-10" },
            urgency: { type: Type.INTEGER, description: "0-10" }
        }
    },
    competitors: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                typeLabel: { type: Type.STRING, description: "e.g., 'Generalist'" },
                weakness: { type: Type.STRING, description: "Very short phrase e.g., 'Poor UX'" },
                strength: { type: Type.STRING, description: "Very short phrase e.g., 'Fast API'" }
            }
        }
    },
    features: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                phase: { type: Type.STRING, description: "One of: 'MVP', 'V1', 'Future'" },
                complexity: { type: Type.STRING, description: "One of: 'Low', 'Medium', 'High'" },
                category: { type: Type.STRING, description: "'Core UI', 'AI Engine', or 'Auth & Sec'" }
            }
        }
    }
  },
  required: ['prd', 'metrics', 'radarAnalysis', 'competitors', 'features']
};

const fallbackMockData = {
    prd: {
        productName: "OriginMock (API 503 Fallback)",
        tagline: "Testing the UI when Gemini is on a coffee break.",
        problemStatement: "The Gemini API is currently experiencing a temporary high-demand spike (503). We are using a locally generated mock blueprint so you can continue testing the frontend interface without blockers.",
        userPainPoints: ["API Rate Limits", "High Demand Spikes", "Temporary Unavailability"],
        marketGap: "Need for robust offline fallbacks.",
        marketOpportunity: "Developing resilient frontends.",
        targetPersona: "Developers and Designers",
        targetPersonaImageText: "A developer looking at a 503 error",
        keyObjectives: ["Test UI rendering", "Verify Kanban board routing", "Ensure history saving works"],
        coreHypothesis: "Mock data keeps the UI flowing smoothly.",
        mitigations: [{risk: "API Load", solution: "Fallback to robust local mock structures."}],
        longTermVision: "Implement automated background retry mechanisms.",
        technicalSpec: {
            techStack: { frontend: "React + Vite", backend: "Node.js", database: "SQLite", infrastructure: "Local" },
            databaseArchitecture: [{ table: "ideas", description: "Stores the generated blueprints" }],
            apiIntegrations: [{ service: "Gemini", purpose: "AI Generation" }],
            securityModel: "Standard JWT"
        },
        successBaseline: "UI components mount",
        successTarget: "UI renders beautifully with data"
    },
    metrics: { healthScore: 88, buildTimeWeeks: "2-4", competitorsCount: 2, mvpFeaturesCount: 3 },
    radarAnalysis: { utility: 9, marketSize: 8, defensibility: 5, monetization: 7, techRisk: 2, urgency: 8 },
    competitors: [
        { name: "Legacy Gen Tool", typeLabel: "Legacy", weakness: "Crashes on 503", strength: "Established" }
    ],
    features: [
        { title: "Mock Auth Setup", description: "Helps test MVP column", phase: "MVP", complexity: "Low", category: "Auth & Sec" },
        { title: "Dashboard Layout", description: "Helps test MVP column", phase: "MVP", complexity: "Medium", category: "Core UI" },
        { title: "Core DB Schema", description: "Helps test MVP column", phase: "MVP", complexity: "Medium", category: "Core UI" },
        { title: "AI Categorization", description: "Helps test V1 column", phase: "V1", complexity: "High", category: "AI Engine" },
        { title: "Mobile Layout", description: "Helps test Future column", phase: "Future", complexity: "Medium", category: "Core UI" }
    ]
};

async function generateBlueprint(ideaPrompt) {
    const prompt = `You are an expert product manager, architect, and startup co-founder using Origin (Precision Instrumentation for Startups). 
A user has submitted the following startup/product idea: "${ideaPrompt}".

Analyze this idea thoroughly and generate a comprehensive software blueprint. Fill out the structured data payload completely with realistic, professional tech-startup level analysis. 

For the Product Requirements Document (PRD):
- Write a long, detailed, multi-paragraph Problem Statement. 
- Integrated the generated [productName] naturally into the narrative.
- provide a deep analysis of the market gap and opportunity.
- List distinct user pain points and specific mitigation strategies.

For the Engineering Blueprint (Technical Spec):
- Suggest a modern, scalable Tech Stack (Frontend, Backend, DB, Infra).
- Define a preliminary Database Architecture with key tables and relationships.
- Detail required 3rd-party API integrations (Auth, Payments, AI, etc.).
- Elaborate on a robust Security Model (Encryption, Auth, Compliance).

- Ensure all sections are useful, detailed, and highlights how Origin instrumentation helps define the path to MVP.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
                temperature: 0.7
            }
        });

        try {
            const data = JSON.parse(response.text);
            return data;
        } catch (err) {
            console.error("Gemini response parsing error:", err);
            throw new Error("Failed to parse AI output into strict JSON.");
        }
    } catch (apiError) {
        console.error("Gemini API Error:", apiError.message || apiError);
        // Fallback robustly for 503s, Overloaded APIs, or fetch failures (network timeouts from Google)
        const errStr = String(apiError).toLowerCase();
        const apiErrMsg = (apiError?.message || "").toLowerCase();
        
        if (
            apiError?.status === 503 || 
            apiError?.status === 'UNAVAILABLE' || 
            errStr.includes('503') || 
            errStr.includes('fetch failed') ||
            apiErrMsg.includes('fetch failed')
        ) {
            console.log("Serving mock data due to 503 or fetch failure.");
            return fallbackMockData;
        }
        throw apiError;
    }
}

async function chatWithBlueprint(blueprintData, history, newMessage) {
    // Construct the context from the blueprint data snippet
    const contextStr = JSON.stringify({
        productName: blueprintData?.prd?.productName,
        tagline: blueprintData?.prd?.tagline,
        hypothesis: blueprintData?.prd?.coreHypothesis,
        techStack: blueprintData?.prd?.technicalSpec?.techStack,
        healthScore: blueprintData?.metrics?.healthScore
    });

    let prompt = `You are an expert AI Co-Founder for a startup. The current project context is: ${contextStr}.\n`;
    
    // Add history
    if (history && history.length > 0) {
        prompt += "Here is the recent conversation history:\n";
        history.forEach(msg => {
            prompt += `${msg.role === 'user' ? 'Founder' : 'You'}: ${msg.content}\n`;
        });
    }

    prompt += `\nFounder: ${newMessage}\nYou (AI Co-Founder):`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7
            }
        });

        return response.text;
    } catch (apiError) {
        console.error("Gemini Chat API Error:", apiError.message || apiError);
        const errStr = String(apiError).toLowerCase();
        const apiErrMsg = (apiError?.message || "").toLowerCase();
        
        if (
            apiError?.status === 503 || 
            apiError?.status === 'UNAVAILABLE' || 
            errStr.includes('503') || 
            errStr.includes('fetch failed') ||
            apiErrMsg.includes('fetch failed')
        ) {
            return "*(System Status: 503 Unavailable)*\n\nI apologize, but my core AI engine is currently experiencing a temporary high-demand spike from Google servers. Please try asking your question again in a few moments!";
        }
        
        throw new Error("Failed to generate chat response: " + apiError.message);
    }
}

module.exports = {
    generateBlueprint,
    chatWithBlueprint
};
