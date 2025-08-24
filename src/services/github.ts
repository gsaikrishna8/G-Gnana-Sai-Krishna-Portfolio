export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics: string[];
  visibility: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'gsaikrishna8';

export class GitHubService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private getCachedData(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async fetchRepositories(): Promise<GitHubRepository[]> {
    const cacheKey = `repos-${USERNAME}`;
    
    // Check cache first
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repositories: GitHubRepository[] = await response.json();
      
      // Filter out forks and sort by updated date
      const filteredRepos = repositories
        .filter(repo => !repo.fork && repo.visibility === 'public')
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      // Cache the result
      this.setCachedData(cacheKey, filteredRepos);
      
      return filteredRepos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async searchRepositories(query: string): Promise<GitHubRepository[]> {
    const allRepos = await this.fetchRepositories();
    
    if (!query.trim()) {
      return allRepos;
    }

    const searchTerm = query.toLowerCase();
    return allRepos.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm) ||
      repo.description?.toLowerCase().includes(searchTerm) ||
      repo.language?.toLowerCase().includes(searchTerm) ||
      repo.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );
  }

  getLanguageColor(language: string | null): string {
    const colors: Record<string, string> = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      C: '#a8b9cc',
      PHP: '#777bb4',
      Ruby: '#cc342d',
      Go: '#00add8',
      Rust: '#dea584',
      Swift: '#fa7343',
      Kotlin: '#f18e33',
      Dart: '#0175c2',
      Shell: '#89e051',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Vue: '#4fc08d',
      React: '#61dafb',
      Angular: '#dd0031'
    };

    return colors[language || ''] || '#6b7280';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Updated today';
    } else if (diffDays === 1) {
      return 'Updated yesterday';
    } else if (diffDays < 30) {
      return `Updated ${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `Updated ${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}

export const githubService = new GitHubService();