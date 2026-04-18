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
}

module.exports = {
    generateBlueprint
};
