import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Zap, 
  Database, 
  Cloud, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Code
} from 'lucide-react';

// Import sub-package demos
import { HuggingFaceDemo } from '../hugging-face/src/components/HuggingFaceDemo';
import { Neo4jDemo } from '../neo4j/src/components/Neo4jDemo';

// Integration Demo Component
export const IntegrationDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const integrations = [
    {
      id: 'hugging-face',
      name: 'Hugging Face',
      description: 'AI model integration and inference',
      icon: Brain,
      status: 'active',
      features: ['Text Generation', 'Classification', 'Question Answering', 'Datasets'],
      color: 'blue'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deployment and analytics platform',
      icon: Zap,
      status: 'active',
      features: ['Deployments', 'Analytics', 'Projects', 'Functions'],
      color: 'purple'
    },
    {
      id: 'google',
      name: 'Google Cloud',
      description: 'Cloud services and APIs',
      icon: Cloud,
      status: 'active',
      features: ['Storage', 'Translation', 'Vision', 'Authentication'],
      color: 'green'
    },
    {
      id: 'neo4j',
      name: 'Neo4j',
      description: 'Graph database integration',
      icon: Database,
      status: 'active',
      features: ['Cypher Queries', 'Graph Visualization', 'Relationships', 'Transactions'],
      color: 'orange'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      green: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    };
    return colors[color] || 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Settings className="h-8 w-8 text-blue-600" />
            @koios/integration Package Demo
          </h1>
          <p className="text-muted-foreground">
            Comprehensive integration solution with specialized sub-packages
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hugging-face">Hugging Face</TabsTrigger>
            <TabsTrigger value="neo4j">Neo4j</TabsTrigger>
            <TabsTrigger value="code">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {integrations.map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${getColorClasses(integration.color)}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Package Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Sub-Packages</span>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Integrations</span>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Features</span>
                    <Badge variant="secondary">16</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Endpoints</span>
                    <Badge variant="secondary">50+</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('hugging-face')}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Test AI Models
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('neo4j')}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Query Graph Database
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('code')}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    View Code Examples
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hugging-face">
            <HuggingFaceDemo />
          </TabsContent>

          <TabsContent value="neo4j">
            <Neo4jDemo />
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`# Install main integration package
npm install @koios/integration

# Install specific sub-packages
npm install @koios/integration-hugging-face
npm install @koios/integration-vercel
npm install @koios/integration-google
npm install @koios/integration-neo4j`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { 
  HuggingFaceClient,
  VercelClient,
  GoogleClient,
  Neo4jClient 
} from '@koios/integration';

// Initialize clients
const hfClient = new HuggingFaceClient({
  apiKey: 'your-hf-token'
});

const vercelClient = new VercelClient({
  apiToken: 'your-vercel-token'
});`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hugging Face Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`const result = await hfClient.inference({
  model: 'gpt2',
  inputs: 'Hello world',
  parameters: {
    max_length: 50,
    temperature: 0.7
  }
});

console.log(result.generated_text);`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Neo4j Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`const neo4jClient = new Neo4jClient({
  uri: 'bolt://localhost:7687',
  username: 'neo4j',
  password: 'password'
});

const result = await neo4jClient.query({
  query: 'MATCH (p:Person) RETURN p',
  parameters: {}
});`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Unified API interface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>TypeScript support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Error handling & retries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Demo components</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span>Hugging Face AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span>Vercel Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-green-600" />
                <span>Google Cloud</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-orange-600" />
                <span>Neo4j Database</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-purple-600" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="link" className="p-0 h-auto">
                📚 Documentation
              </Button>
              <Button variant="link" className="p-0 h-auto">
                🧪 Demo Components
              </Button>
              <Button variant="link" className="p-0 h-auto">
                🔧 Development Guide
              </Button>
              <Button variant="link" className="p-0 h-auto">
                📦 Package Registry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
