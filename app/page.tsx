"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Info, Key } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const MODEL_PRESETS = {
  generation: [
    { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek-R1" },
    { id: "Alibaba-NLP/Tongyi-DeepResearch-30B-A3B", name: "Tongyi-DeepResearch-30B" },
    { id: "Qwen/Qwen2.5-3B-Instruct", name: "Qwen2.5-3B-Instruct" },
  ],
  embedding: [
    { id: "google/embeddinggemma-300m", name: "EmbeddingGemma-300M" },
    { id: "microsoft/deberta-v3-large", name: "DeBERTa-v3-Large" },
    { id: "microsoft/deberta-v3-base", name: "DeBERTa-v3-Base" },
  ],
}

const HUGGINGFACE_TASKS = {
  "Natural Language Processing": [
    { value: "text-generation", label: "Text Generation" },
    { value: "feature-extraction", label: "Feature Extraction" },
    { value: "fill-mask", label: "Fill Mask" },
    { value: "question-answering", label: "Question Answering" },
    { value: "sentence-similarity", label: "Sentence Similarity" },
    { value: "summarization", label: "Summarization" },
    { value: "table-question-answering", label: "Table Question Answering" },
    { value: "text-classification", label: "Text Classification" },
    { value: "text-ranking", label: "Text Ranking" },
    { value: "token-classification", label: "Token Classification" },
    { value: "translation", label: "Translation" },
    { value: "zero-shot-classification", label: "Zero-Shot Classification" },
  ],
  "Computer Vision": [
    { value: "depth-estimation", label: "Depth Estimation" },
    { value: "image-classification", label: "Image Classification" },
    { value: "image-feature-extraction", label: "Image Feature Extraction" },
    { value: "image-segmentation", label: "Image Segmentation" },
    { value: "image-to-image", label: "Image-to-Image" },
    { value: "image-to-text", label: "Image-to-Text" },
    { value: "image-to-video", label: "Image-to-Video" },
    { value: "keypoint-detection", label: "Keypoint Detection" },
    { value: "mask-generation", label: "Mask Generation" },
    { value: "object-detection", label: "Object Detection" },
    { value: "text-to-image", label: "Text-to-Image" },
    { value: "text-to-video", label: "Text-to-Video" },
    { value: "text-to-3d", label: "Text-to-3D" },
    { value: "image-to-3d", label: "Image-to-3D" },
    { value: "video-classification", label: "Video Classification" },
    { value: "video-to-video", label: "Video-to-Video" },
    { value: "unconditional-image-generation", label: "Unconditional Image Generation" },
    { value: "zero-shot-image-classification", label: "Zero-Shot Image Classification" },
    { value: "zero-shot-object-detection", label: "Zero-Shot Object Detection" },
  ],
  Audio: [
    { value: "audio-classification", label: "Audio Classification" },
    { value: "audio-to-audio", label: "Audio-to-Audio" },
    { value: "automatic-speech-recognition", label: "Automatic Speech Recognition" },
    { value: "text-to-speech", label: "Text-to-Speech" },
  ],
  Multimodal: [
    { value: "any-to-any", label: "Any-to-Any" },
    { value: "audio-text-to-text", label: "Audio-Text-to-Text" },
    { value: "document-question-answering", label: "Document Question Answering" },
    { value: "visual-document-retrieval", label: "Visual Document Retrieval" },
    { value: "image-text-to-text", label: "Image-Text-to-Text" },
    { value: "video-text-to-text", label: "Video-Text-to-Text" },
    { value: "visual-question-answering", label: "Visual Question Answering" },
  ],
  Tabular: [
    { value: "tabular-classification", label: "Tabular Classification" },
    { value: "tabular-regression", label: "Tabular Regression" },
  ],
  "Reinforcement Learning": [{ value: "reinforcement-learning", label: "Reinforcement Learning" }],
}

type SearchResult = {
  id: string
  modelId: string
  downloads?: number
  likes?: number
  tags?: string[]
}

type ModelInfo = {
  modelId: string
  pipelineTag?: string
  tags: string[]
  downloads?: number
  likes?: number
  library?: string
  description?: string
  language?: string[]
}

export default function HuggingFaceTester() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [validatingApiKey, setValidatingApiKey] = useState(false)
  const [apiKeyValidation, setApiKeyValidation] = useState<{
    status: "idle" | "valid" | "invalid"
    message: string
  }>({ status: "idle", message: "" })
  const [capability, setCapability] = useState<"generation" | "embedding">("generation")
  const [modelId, setModelId] = useState(MODEL_PRESETS.generation[0].id)
  const [prompt, setPrompt] = useState("Hello, how are you?")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [selectedTask, setSelectedTask] = useState("text-generation")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<SearchResult[]>([])
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [loadingModelInfo, setLoadingModelInfo] = useState(false)
  const [showParameters, setShowParameters] = useState(false)
  const [parameters, setParameters] = useState({
    maxTokens: 250,
    temperature: 0.7,
    topP: 0.9,
    repetitionPenalty: 1.0,
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchAutocompleteSuggestions()
      } else {
        setAutocompleteSuggestions([])
        setShowAutocomplete(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (modelId) {
      fetchModelInfo()
    }
  }, [modelId])

  useEffect(() => {
    const savedApiKey = localStorage.getItem("huggingface_api_key")
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("huggingface_api_key", apiKey)
    } else {
      localStorage.removeItem("huggingface_api_key")
    }
  }, [apiKey])

  const fetchAutocompleteSuggestions = async () => {
    try {
      const params = new URLSearchParams({ limit: "10" })

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim())
      }

      if (selectedTask) {
        params.append("task", selectedTask)
      }

      const res = await fetch(`/api/search-models?${params.toString()}`)
      const data = await res.json()

      if (res.ok) {
        setAutocompleteSuggestions(data.models || [])
        setShowAutocomplete(true)
      }
    } catch (err) {
      console.error("[v0] Autocomplete fetch error:", err)
    }
  }

  const fetchModelInfo = async () => {
    setLoadingModelInfo(true)
    setModelInfo(null)
    try {
      const headers: HeadersInit = {}
      if (apiKey) {
        headers["x-huggingface-api-key"] = apiKey
      }

      const res = await fetch(`/api/model-info?modelId=${encodeURIComponent(modelId)}`, {
        headers,
      })
      const data = await res.json()

      if (res.ok) {
        setModelInfo(data)
      }
    } catch (err) {
      console.error("[v0] Failed to fetch model info:", err)
    } finally {
      setLoadingModelInfo(false)
    }
  }

  const selectSuggestion = (modelIdValue: string) => {
    setModelId(modelIdValue)
    setSearchQuery("")
    setShowAutocomplete(false)
    setAutocompleteSuggestions([])
  }

  const handleCapabilityChange = (newCapability: "generation" | "embedding") => {
    setCapability(newCapability)
    setModelId(MODEL_PRESETS[newCapability][0].id)
    if (newCapability === "embedding") {
      setPrompt("This is a sample text to generate embeddings.")
    } else {
      setPrompt("Hello, how are you?")
    }
  }

  const searchModels = async () => {
    setSearching(true)
    setSearchError("")
    setSearchResults([])

    try {
      const params = new URLSearchParams({ limit: "20" })

      if (selectedTask) {
        params.append("task", selectedTask)
      }

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim())
      }

      if (!selectedTask && !searchQuery.trim()) {
        throw new Error("Please select a task or enter a search query")
      }

      const res = await fetch(`/api/search-models?${params.toString()}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to search models")
      }

      setSearchResults(data.models || [])
    } catch (err: any) {
      setSearchError(err.message)
    } finally {
      setSearching(false)
    }
  }

  const testModel = async () => {
    setLoading(true)
    setError("")
    setResponse("")

    try {
      const res = await fetch("/api/huggingface", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId,
          prompt,
          taskType: capability,
          parameters,
          apiKey: apiKey || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to call model")
      }

      setResponse(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setApiKeyValidation({
        status: "invalid",
        message: "Please enter an API key",
      })
      return
    }

    setValidatingApiKey(true)
    setApiKeyValidation({ status: "idle", message: "" })

    try {
      const res = await fetch(`/api/model-info?modelId=gpt2`, {
        headers: {
          "x-huggingface-api-key": apiKey,
        },
      })

      if (res.ok) {
        setApiKeyValidation({
          status: "valid",
          message: "API key is valid and working!",
        })
      } else {
        const data = await res.json()
        setApiKeyValidation({
          status: "invalid",
          message: data.error || "API key validation failed",
        })
      }
    } catch (err: any) {
      setApiKeyValidation({
        status: "invalid",
        message: err.message || "Failed to validate API key",
      })
    } finally {
      setValidatingApiKey(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">HuggingFace Model Tester</h1>
          <p className="mt-2 text-muted-foreground">Search, discover, and test HuggingFace models</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Search Models</CardTitle>
              <CardDescription>Find models by name, task type, or both</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative space-y-2">
                <Label htmlFor="search-query">Search by Name</Label>
                <Input
                  ref={searchInputRef}
                  id="search-query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., llama, bert, gpt..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchModels()
                    }
                  }}
                  onFocus={() => {
                    if (autocompleteSuggestions.length > 0) {
                      setShowAutocomplete(true)
                    }
                  }}
                />

                {showAutocomplete && autocompleteSuggestions.length > 0 && (
                  <div
                    ref={autocompleteRef}
                    className="absolute z-50 mt-1 max-h-[300px] w-full overflow-auto rounded-md border bg-popover shadow-md"
                  >
                    {autocompleteSuggestions.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => selectSuggestion(model.id || model.modelId)}
                        className="w-full border-b p-3 text-left text-sm transition-colors last:border-b-0 hover:bg-accent"
                      >
                        <div className="font-medium">{model.id || model.modelId}</div>
                        <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                          {model.downloads && <span>↓ {model.downloads.toLocaleString()}</span>}
                          {model.likes && <span>♥ {model.likes.toLocaleString()}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="task">Task Type (Optional)</Label>
                <Select value={selectedTask} onValueChange={setSelectedTask}>
                  <SelectTrigger id="task">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {Object.entries(HUGGINGFACE_TASKS).map(([category, tasks]) => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category}</div>
                        {tasks.map((task) => (
                          <SelectItem key={task.value} value={task.value}>
                            {task.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={searchModels} disabled={searching} className="w-full">
                <Search className="mr-2 h-4 w-4" />
                {searching ? "Searching..." : "Search Models"}
              </Button>

              {searchError && (
                <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                  {searchError}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label>Results ({searchResults.length})</Label>
                  <div className="max-h-[400px] space-y-2 overflow-auto rounded-lg border p-2">
                    {searchResults.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setModelId(model.id || model.modelId)}
                        className="w-full rounded-md border bg-card p-3 text-left text-sm transition-colors hover:bg-accent"
                      >
                        <div className="font-medium">{model.id || model.modelId}</div>
                        <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                          {model.downloads && <span>↓ {model.downloads.toLocaleString()}</span>}
                          {model.likes && <span>♥ {model.likes.toLocaleString()}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>Select a capability and model to test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="api-key">HuggingFace API Key (Optional)</Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value)
                      setApiKeyValidation({ status: "idle", message: "" })
                    }}
                    placeholder="hf_..."
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)} className="shrink-0">
                    {showApiKey ? "Hide" : "Show"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={validateApiKey}
                    disabled={validatingApiKey || !apiKey.trim()}
                    className="shrink-0 bg-transparent"
                  >
                    {validatingApiKey ? "Validating..." : "Validate"}
                  </Button>
                </div>
                {apiKeyValidation.status !== "idle" && (
                  <div
                    className={`rounded-md border p-2 text-xs ${
                      apiKeyValidation.status === "valid"
                        ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                        : "border-destructive bg-destructive/10 text-destructive"
                    }`}
                  >
                    {apiKeyValidation.message}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {apiKey
                    ? "Using your API key. It's stored locally in your browser."
                    : "Using environment variable. Add your own key for personalized access."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capability">Capability</Label>
                <Select value={capability} onValueChange={handleCapabilityChange}>
                  <SelectTrigger id="capability">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="generation">Text Generation</SelectItem>
                    <SelectItem value="embedding">Embeddings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model Presets</Label>
                <Select value={modelId} onValueChange={setModelId}>
                  <SelectTrigger id="model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_PRESETS[capability].map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-model">Current Model ID</Label>
                <Input
                  id="custom-model"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  placeholder="e.g., meta-llama/Llama-3.2-1B-Instruct"
                />
              </div>

              {modelInfo && (
                <div className="rounded-lg border bg-muted/50 p-3 text-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <Info className="h-4 w-4" />
                    Model Information
                  </div>
                  <div className="space-y-1 text-xs">
                    {modelInfo.pipelineTag && (
                      <div>
                        <span className="font-medium">Task:</span> {modelInfo.pipelineTag}
                      </div>
                    )}
                    {modelInfo.library && (
                      <div>
                        <span className="font-medium">Library:</span> {modelInfo.library}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {modelInfo.downloads && <span>↓ {modelInfo.downloads.toLocaleString()}</span>}
                      {modelInfo.likes && <span>♥ {modelInfo.likes.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
              )}

              {loadingModelInfo && (
                <div className="rounded-lg border bg-muted/50 p-3 text-center text-sm text-muted-foreground">
                  Loading model information...
                </div>
              )}

              {capability === "generation" && (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowParameters(!showParameters)}
                    className="w-full"
                  >
                    {showParameters ? "Hide" : "Show"} Advanced Parameters
                  </Button>

                  {showParameters && (
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="max-tokens">Max Tokens</Label>
                          <span className="text-sm text-muted-foreground">{parameters.maxTokens}</span>
                        </div>
                        <Slider
                          id="max-tokens"
                          min={50}
                          max={2000}
                          step={50}
                          value={[parameters.maxTokens]}
                          onValueChange={([value]) => setParameters({ ...parameters, maxTokens: value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="temperature">Temperature</Label>
                          <span className="text-sm text-muted-foreground">{parameters.temperature.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="temperature"
                          min={0}
                          max={2}
                          step={0.1}
                          value={[parameters.temperature]}
                          onValueChange={([value]) => setParameters({ ...parameters, temperature: value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="top-p">Top P</Label>
                          <span className="text-sm text-muted-foreground">{parameters.topP.toFixed(2)}</span>
                        </div>
                        <Slider
                          id="top-p"
                          min={0}
                          max={1}
                          step={0.05}
                          value={[parameters.topP]}
                          onValueChange={([value]) => setParameters({ ...parameters, topP: value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="repetition-penalty">Repetition Penalty</Label>
                          <span className="text-sm text-muted-foreground">
                            {parameters.repetitionPenalty.toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          id="repetition-penalty"
                          min={1}
                          max={2}
                          step={0.1}
                          value={[parameters.repetitionPenalty]}
                          onValueChange={([value]) => setParameters({ ...parameters, repetitionPenalty: value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="prompt">{capability === "embedding" ? "Text to Embed" : "Prompt / Input"}</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  rows={4}
                />
              </div>

              <Button onClick={testModel} disabled={loading} className="w-full">
                {loading ? "Testing..." : "Test Model"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {response && (
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">{response}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
