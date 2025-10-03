import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Database, TrendingUp } from 'lucide-react';

// Mock Hugging Face API responses
const mockModels = [
  { id: 'gpt2', name: 'GPT-2', description: 'Text generation model', tags: ['text-generation', 'nlp'], downloads: 1000000, likes: 5000 },
  { id: 'bert-base', name: 'BERT Base', description: 'Bidirectional encoder', tags: ['text-classification', 'nlp'], downloads: 2000000, likes: 8000 },
  { id: 'distilbert', name: 'DistilBERT', description: 'Lightweight BERT', tags: ['question-answering', 'nlp'], downloads: 1500000, likes: 6000 },
];

const mockInferenceResponse = {
  generated_text: "This is a sample AI-generated response that demonstrates the capabilities of the Hugging Face integration package.",
  score: 0.95
};

// Hugging Face Demo Component
export const HuggingFaceDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(mockModels[0]);
  const [inputText, setInputText] = useState('The future of artificial intelligence is');
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const simulateInference = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setInferenceResult(mockInferenceResponse.generated_text);
    setIsLoading(false);
  };

  const getTaskColor = (task: string) => {
    const colors: Record<string, string> = {
      'text-generation': 'bg-blue-100 text-blue-800',
      'text-classification': 'bg-green-100 text-green-800',
      'question-answering': 'bg-purple-100 text-purple-800',
      'nlp': 'bg-orange-100 text-orange-800',
    };
    return colors[task] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            @koios/integration-hugging-face Demo
          </h1>
          <p className="text-muted-foreground">
            AI model integration with Hugging Face API
          </p>
        </div>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="inference">Inference</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockModels.map((model) => (
                    <Card 
                      key={model.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedModel.id === model.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedModel(model)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {model.tags.map((tag) => (
                              <Badge key={tag} className={getTaskColor(tag)}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>📥 {model.downloads.toLocaleString()}</span>
                            <span>❤️ {model.likes.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inference" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Inference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Hugging Face API key"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Selected Model</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <div className="font-semibold">{selectedModel.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedModel.description}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text for AI processing..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={simulateInference} 
                  disabled={!apiKey || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Run Inference
                    </>
                  )}
                </Button>

                {inferenceResult && (
                  <div className="space-y-2">
                    <Label>Generated Output</Label>
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                      <p className="text-green-800 dark:text-green-200">{inferenceResult}</p>
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        Confidence: 95%
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Popular Datasets</h3>
                    <div className="space-y-2">
                      {['imdb', 'squad', 'glue', 'wikipedia'].map((dataset) => (
                        <div key={dataset} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{dataset}</div>
                            <div className="text-sm text-muted-foreground">Text classification dataset</div>
                          </div>
                          <Badge variant="secondary">Public</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Dataset Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Total Datasets: 1,234</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Downloads Today: 45,678</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Active Models: 567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Text generation with GPT models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Text classification and sentiment analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Question answering systems</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Dataset management and access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Model fine-tuning support</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { HuggingFaceClient } from '@koios/integration-hugging-face';

const client = new HuggingFaceClient({
  apiKey: 'your-api-key'
});

const result = await client.inference({
  model: 'gpt2',
  inputs: 'Hello world',
  parameters: {
    max_length: 50,
    temperature: 0.7
  }
});`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
