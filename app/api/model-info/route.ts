import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("modelId")

    if (!modelId) {
      return NextResponse.json({ error: "Model ID is required" }, { status: 400 })
    }

    const userApiKey = request.headers.get("x-huggingface-api-key")
    const HF_TOKEN = userApiKey || process.env.HUGGINGFACE_API_KEY

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (HF_TOKEN) {
      headers["Authorization"] = `Bearer ${HF_TOKEN}`
    }

    const response = await fetch(`https://huggingface.co/api/models/${modelId}`, {
      headers,
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch model info: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      modelId: data.id || data.modelId,
      pipelineTag: data.pipeline_tag,
      tags: data.tags || [],
      downloads: data.downloads,
      likes: data.likes,
      library: data.library_name,
      description: data.cardData?.description,
      language: data.cardData?.language,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
