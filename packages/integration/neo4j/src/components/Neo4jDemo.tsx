import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Network, Play, Users, MessageSquare, Heart } from 'lucide-react';

// Mock Neo4j data
const mockNodes = [
  { id: '1', labels: ['Person'], properties: { name: 'Alice', age: 30, city: 'New York' } },
  { id: '2', labels: ['Person'], properties: { name: 'Bob', age: 25, city: 'San Francisco' } },
  { id: '3', labels: ['Person'], properties: { name: 'Charlie', age: 35, city: 'London' } },
  { id: '4', labels: ['Company'], properties: { name: 'TechCorp', industry: 'Technology' } },
  { id: '5', labels: ['Company'], properties: { name: 'DataInc', industry: 'Analytics' } },
];

const mockRelationships = [
  { id: '1', type: 'WORKS_FOR', startNode: '1', endNode: '4', properties: { role: 'Developer', since: 2020 } },
  { id: '2', type: 'WORKS_FOR', startNode: '2', endNode: '5', properties: { role: 'Analyst', since: 2021 } },
  { id: '3', type: 'KNOWS', startNode: '1', endNode: '2', properties: { strength: 'strong' } },
  { id: '4', type: 'KNOWS', startNode: '2', endNode: '3', properties: { strength: 'weak' } },
];

const sampleQueries = [
  {
    name: 'Find all people',
    query: 'MATCH (p:Person) RETURN p.name, p.age, p.city',
    description: 'Retrieve all person nodes with their properties'
  },
  {
    name: 'Find people who work for companies',
    query: 'MATCH (p:Person)-[r:WORKS_FOR]->(c:Company) RETURN p.name, c.name, r.role',
    description: 'Find relationships between people and companies'
  },
  {
    name: 'Find mutual connections',
    query: 'MATCH (p1:Person)-[:KNOWS]-(p2:Person) RETURN p1.name, p2.name',
    description: 'Find people who know each other'
  },
  {
    name: 'Count nodes by label',
    query: 'MATCH (n) RETURN labels(n) as label, count(n) as count',
    description: 'Count nodes grouped by their labels'
  }
];

// Neo4j Demo Component
export const Neo4jDemo: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState(sampleQueries[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionConfig, setConnectionConfig] = useState({
    uri: 'bolt://localhost:7687',
    username: 'neo4j',
    password: 'password',
    database: 'neo4j'
  });

  const simulateQuery = async (query: string) => {
    setIsLoading(true);
    // Simulate query execution delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock query results based on the query
    let mockResult: any[] = [];
    if (query.includes('Person')) {
      mockResult = mockNodes.filter(n => n.labels.includes('Person')).map(n => ({
        'p.name': n.properties.name,
        'p.age': n.properties.age,
        'p.city': n.properties.city
      }));
    } else if (query.includes('WORKS_FOR')) {
      mockResult = mockRelationships.filter(r => r.type === 'WORKS_FOR').map(r => {
        const person = mockNodes.find(n => n.id === r.startNode);
        const company = mockNodes.find(n => n.id === r.endNode);
        return {
          'p.name': person?.properties.name,
          'c.name': company?.properties.name,
          'r.role': r.properties.role
        };
      });
    } else if (query.includes('KNOWS')) {
      mockResult = mockRelationships.filter(r => r.type === 'KNOWS').map(r => {
        const p1 = mockNodes.find(n => n.id === r.startNode);
        const p2 = mockNodes.find(n => n.id === r.endNode);
        return {
          'p1.name': p1?.properties.name,
          'p2.name': p2?.properties.name
        };
      });
    } else if (query.includes('count')) {
      mockResult = [
        { label: ['Person'], count: 3 },
        { label: ['Company'], count: 2 }
      ];
    }
    
    setQueryResult(mockResult);
    setIsLoading(false);
  };

  const runSelectedQuery = () => {
    simulateQuery(selectedQuery.query);
  };

  const runCustomQuery = () => {
    simulateQuery(customQuery);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Database className="h-8 w-8 text-green-600" />
            @koios/integration-neo4j Demo
          </h1>
          <p className="text-muted-foreground">
            Graph database integration with Neo4j
          </p>
        </div>

        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="graph">Graph View</TabsTrigger>
            <TabsTrigger value="data">Data Browser</TabsTrigger>
          </TabsList>

          <TabsContent value="connection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Connection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="uri">Database URI</Label>
                    <Input
                      id="uri"
                      value={connectionConfig.uri}
                      onChange={(e) => setConnectionConfig(prev => ({ ...prev, uri: e.target.value }))}
                      placeholder="bolt://localhost:7687"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="database">Database Name</Label>
                    <Input
                      id="database"
                      value={connectionConfig.database}
                      onChange={(e) => setConnectionConfig(prev => ({ ...prev, database: e.target.value }))}
                      placeholder="neo4j"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={connectionConfig.username}
                      onChange={(e) => setConnectionConfig(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="neo4j"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={connectionConfig.password}
                      onChange={(e) => setConnectionConfig(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="password"
                    />
                  </div>
                </div>
                <Button className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Queries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sampleQueries.map((query, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedQuery.name === query.name ? 'ring-2 ring-green-500' : ''
                      }`}
                      onClick={() => setSelectedQuery(query)}
                    >
                      <div className="font-semibold">{query.name}</div>
                      <div className="text-sm text-muted-foreground">{query.description}</div>
                      <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
                        {query.query}
                      </pre>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Query</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-query">Cypher Query</Label>
                    <Textarea
                      id="custom-query"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      placeholder="MATCH (n) RETURN n LIMIT 10"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={runSelectedQuery} disabled={isLoading}>
                      <Play className="h-4 w-4 mr-2" />
                      Run Sample
                    </Button>
                    <Button onClick={runCustomQuery} disabled={isLoading || !customQuery} variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Run Custom
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {queryResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Query Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          {Object.keys(queryResult[0] || {}).map((key) => (
                            <th key={key} className="text-left p-2 font-semibold">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, index) => (
                          <tr key={index} className="border-b">
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="p-2">
                                {Array.isArray(value) ? value.join(', ') : String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="graph" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Graph Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 border rounded-lg bg-muted/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Network className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">Graph Visualization</h3>
                      <p className="text-sm text-muted-foreground">
                        Interactive graph view would be rendered here
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Badge variant="secondary">3 People</Badge>
                      <Badge variant="secondary">2 Companies</Badge>
                      <Badge variant="secondary">4 Relationships</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNodes.map((node) => (
                      <div key={node.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{node.labels.join(', ')}</Badge>
                          <span className="text-sm text-muted-foreground">ID: {node.id}</span>
                        </div>
                        <div className="space-y-1">
                          {Object.entries(node.properties).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Relationships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRelationships.map((rel) => (
                      <div key={rel.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{rel.type}</Badge>
                          <span className="text-sm text-muted-foreground">ID: {rel.id}</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>From: Node {rel.startNode}</div>
                          <div>To: Node {rel.endNode}</div>
                          {Object.entries(rel.properties).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <span>Cypher query execution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Node and relationship management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Graph visualization support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Transaction management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Connection pooling</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { Neo4jClient } from '@koios/integration-neo4j';

const client = new Neo4jClient({
  uri: 'bolt://localhost:7687',
  username: 'neo4j',
  password: 'password'
});

const result = await client.query({
  query: 'MATCH (p:Person) RETURN p',
  parameters: {}
});`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
