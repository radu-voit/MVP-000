import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const task = searchParams.get("task")
  const search = searchParams.get("search")
  const limit = searchParams.get("limit") || "20"

  if (!task && !search) {
    return NextResponse.json({ error: "Either task or search parameter is required" }, { status: 400 })
  }

  try {
    let url = `https://huggingface.co/api/models?limit=${limit}&sort=downloads`

    if (task) {
      url += `&filter=${task}`
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HuggingFace API returned ${response.status}`)
    }

    const models = await response.json()

    return NextResponse.json({ models, task, search })
  } catch (error: any) {
    console.error("Model search error:", error)
    return NextResponse.json({ error: error.message || "Failed to search models" }, { status: 500 })
  }
}
