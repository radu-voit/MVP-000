import { type NextRequest, NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

export async function POST(request: NextRequest) {
  try {
    const { modelId, prompt, taskType, parameters = {} } = await request.json()

    if (!modelId || !prompt) {
      return NextResponse.json({ error: "Model ID and prompt are required" }, { status: 400 })
    }

    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY

    if (!HF_TOKEN) {
      return NextResponse.json({ error: "HUGGINGFACE_API_KEY environment variable is not set" }, { status: 500 })
    }

    const hf = new HfInference(HF_TOKEN)

    if (taskType === "embedding") {
      try {
        const result = await hf.featureExtraction({
          model: modelId,
          inputs: prompt,
        })

        return NextResponse.json({
          type: "embedding",
          output: result,
          dimensions: Array.isArray(result) ? result.length : "unknown",
          raw: result,
        })
      } catch (embeddingError: any) {
        return NextResponse.json(
          {
            error: "Embedding generation failed",
            details: embeddingError.message,
          },
          { status: 400 },
        )
      }
    }

    const inferenceParams = {
      max_new_tokens: parameters.maxTokens || 250,
      temperature: parameters.temperature !== undefined ? parameters.temperature : 0.7,
      top_p: parameters.topP !== undefined ? parameters.topP : 0.9,
      repetition_penalty: parameters.repetitionPenalty || 1.0,
    }

    try {
      const result = await hf.textGeneration({
        model: modelId,
        inputs: prompt,
        parameters: inferenceParams,
      })

      return NextResponse.json({
        type: "text-generation",
        output: result.generated_text,
        raw: result,
      })
    } catch (textGenError: any) {
      try {
        const chatResult = await hf.chatCompletion({
          model: modelId,
          messages: [{ role: "user", content: prompt }],
          max_tokens: inferenceParams.max_new_tokens,
          temperature: inferenceParams.temperature,
          top_p: inferenceParams.top_p,
        })

        return NextResponse.json({
          type: "chat-completion",
          output: chatResult.choices[0]?.message?.content || "",
          raw: chatResult,
        })
      } catch (chatError: any) {
        return NextResponse.json(
          {
            error: "Model inference failed",
            details: {
              textGenerationError: textGenError.message,
              chatCompletionError: chatError.message,
              suggestion: "This model may not support text generation or chat. Try a different model or task type.",
            },
          },
          { status: 400 },
        )
      }
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
