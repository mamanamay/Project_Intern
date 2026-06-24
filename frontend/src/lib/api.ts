const BASE_URL: string = import.meta.env.VITE_API_URL || '/api';

interface FetchOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `HTTP error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const authApi = {
  async login(username: string, password: string): Promise<{ access_token: string }> {
    return apiFetch<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: { username, password }
    });
  },

  async register(username: string, password: string): Promise<{ access_token: string }> {
    return apiFetch<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: { username, password }
    });
  }
};

export interface CvProfile {
  name: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
}

export interface CvEducation {
  institution: string;
  period: string;
  details: string;
}

export interface CvCertification {
  name: string;
  date: string;
}

export interface CvAchievement {
  title: string;
  date: string;
  category: string;
}

export interface CvProject {
  title: string;
  code: string;
  description: string;
}

export interface CvSkills {
  programming: string;
  tools: string;
}

export interface CvSocialLinks {
  github: string;
  linkedin: string;
}

export interface CvCustomBlockItem {
  title: string;
  period: string;
  description: string;
}

export interface CvCustomBlock {
  id: string;
  title: string;
  emoji: string;
  items: CvCustomBlockItem[];
}

export interface CvData {
  profile: CvProfile;
  education: CvEducation[];
  certifications: CvCertification[];
  achievements: CvAchievement[];
  projects: CvProject[];
  skills: CvSkills;
  socialLinks: CvSocialLinks;
  customBlocks: CvCustomBlock[];
}

export const cvApi = {
  async getCv(): Promise<CvData> {
    return apiFetch<CvData>('/cv');
  },

  async updateCv(data: CvData, token?: string | null): Promise<CvData> {
    return apiFetch<CvData>('/cv', {
      method: 'PATCH',
      body: data,
      token
    });
  }
};

export function connectSSE(onMessage: (data: CvData) => void): EventSource {
  const eventSource = new EventSource(`${BASE_URL}/cv/stream`);

  eventSource.onmessage = (event) => {
    try {
      const data: CvData = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error('SSE parse error:', err);
    }
  };

  eventSource.onerror = (err) => {
    console.error('SSE connection error:', err);
  };

  return eventSource;
}
