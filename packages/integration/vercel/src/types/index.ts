// Vercel Types
export interface VercelConfig {
  apiToken: string;
  teamId?: string;
  baseUrl?: string;
}

export interface Deployment {
  id: string;
  name: string;
  url: string;
  state: 'READY' | 'BUILDING' | 'ERROR' | 'QUEUED';
  createdAt: number;
  updatedAt: number;
  creator: {
    uid: string;
    email: string;
  };
  target?: 'production' | 'staging';
  alias?: string[];
}

export interface AnalyticsData {
  pageviews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export interface Project {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  framework?: string;
  gitRepository?: {
    type: string;
    repo: string;
    repoId: number;
  };
}
