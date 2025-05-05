import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!process.env.NEXT_LLAMA_API_KEY) {
      throw new Error("NEXT_LLAMA_API_KEY is not set in environment variables");
    }

    console.log("Making request to Llama API with prompt:", prompt);
    console.log("Llama API key:", process.env.NEXT_LLAMA_API_KEY);
    
    const response = await fetch("https://api.llama.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_LLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Llama API error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Llama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Llama API response:", data);
    
    // Extract the response content and split it into individual feature requests
    const content = data.choices[0].message.content;
    const results = content
      .split("\n")
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^\d+\.\s*/, "").trim());

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in Llama API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
} 