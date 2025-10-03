// Neo4j Types
export interface Neo4jConfig {
  uri: string;
  username: string;
  password: string;
  database?: string;
}

export interface CypherQuery {
  query: string;
  parameters?: Record<string, any>;
}

export interface Node {
  id: string;
  labels: string[];
  properties: Record<string, any>;
}

export interface Relationship {
  id: string;
  type: string;
  startNode: string;
  endNode: string;
  properties: Record<string, any>;
}

export interface QueryResult {
  records: Array<{
    keys: string[];
    length: number;
    _fields: any[];
  }>;
  summary: {
    query: string;
    parameters: Record<string, any>;
    queryType: string;
    plan?: any;
    profile?: any;
  };
}
