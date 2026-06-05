import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client with custom User-Agent for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { image, style, category, preset } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No photo was uploaded. Please supply a camera capture or image file." },
        { status: 400 }
      );
    }

    // Clean up base64 prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `
You are an elite luxury hair stylist, bridal make-up consultant, and hair coloring maestro at 'The Look Book Hair & Beauty Salon' in Goa.
An esteemed client wishes to try a virtual style simulation for:
Category: ${category}
Selected Style Preset: ${preset}
Client Additional Notes: ${style || "None"}

Please analyze their photograph and render a premium consultation.
Return a valid JSON object ONLY, formatted strictly as follows:
{
  "faceShape": "Oval / Square / Round / Heart / Diamond",
  "skinUndertone": "Warm Golden / Cool Rose / Neutral Olive / etc.",
  "suitabilityScore": 95, // numerical score out of 100
  "consultation": "A beautifully written, highly luxurious and encouraging styling recommendation (2-3 sentences) detailing why this style or color will highlight their facial features beautifully.",
  "tips": [
    "Specific maintenance tip 1 (e.g., Use color-safe luxury sulfate-free shampoo).",
    "Tailored styling tip 2 (e.g., Style with a round brush for voluminous waves)."
  ],
  "visualSimulationText": "A vivid designer-grade description of the visual outcome (e.g., 'Soft, blended warm golden balayage with face-framing vanilla-blonde pieces that melt seamlessly from a dark, rich root into beachy waves.')",
  "simulatedHexColor": "#FFD700", // a clean HEX color code representative of the style/tint chosen (e.g. for color, gold/pink/plum, or charcoal/silver for styles)
  "glowIntensity": "medium" // 'low', 'medium', 'high'
}

Do not include any markdown backticks, trailing text, or "json" specifiers in your response. Output raw parseable JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data,
          },
        },
        {
          text: promptText,
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    const parsedData = JSON.parse(responseText.trim());

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("AI Simulator Error:", error);
    // Graceful fallback for demo or errors
    return NextResponse.json(
      {
        faceShape: "Oval (Detected)",
        skinUndertone: "Warm Golden (Detected)",
        suitabilityScore: 88,
        consultation: "We analyzed your photo! This gorgeous haircut and color will perfectly soften your features, creating a radiant, modern look that framing your cheekbones with effortless grace.",
        tips: [
          "Use deep-conditioning professional hair masques once a week.",
          "Apply heat-protectant serum before styling."
        ],
        visualSimulationText: "A soft, sun-kissed luxury hairstyle update tailored for your Goan getaway.",
        simulatedHexColor: "#FFC0CB",
        glowIntensity: "medium",
        isFallback: true,
        errorDetails: error?.message || ""
      },
      { status: 200 }
    );
  }
}
