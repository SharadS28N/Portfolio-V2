import { useState, useEffect } from 'react';
import { GITHUB_CONFIG } from '../config/github';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  homepage: string;
  fork: boolean;
  default_branch: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string | null;
  demo: string | null;
  tags: string[];
}

async function getReadmeImageUrl(repo: GitHubRepo): Promise<string | null> {
  try {
    const readmeResponse = await fetch(
      `${GITHUB_CONFIG.apiBaseUrl}/repos/${GITHUB_CONFIG.username}/${repo.name}/readme`,
      { headers: { Accept: 'application/vnd.github.raw' } }
    );
    
    if (!readmeResponse.ok) return null;
    
    const readmeContent = await readmeResponse.text();
    
    // Match image patterns in markdown
    const imagePatterns = [
      /!\[.*?\]\((.*?)\)/i, // ![alt](url)
      /<img.*?src=["'](.*?)["']/i // <img src="url">
    ];
    
    for (const pattern of imagePatterns) {
      const match = readmeContent.match(pattern);
      if (match && match[1]) {
        const imageUrl = match[1];
        // Convert relative URLs to absolute
        if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || !imageUrl.startsWith('http')) {
          return `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${repo.name}/${repo.default_branch}/${imageUrl.replace(/^[\.\/]+/, '')}`;
        }
        return imageUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const queryParams = new URLSearchParams({
          sort: GITHUB_CONFIG.sortBy,
          per_page: GITHUB_CONFIG.repoLimit.toString()
        });

        const response = await fetch(
          `${GITHUB_CONFIG.apiBaseUrl}/users/${GITHUB_CONFIG.username}/repos?${queryParams}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const repos: GitHubRepo[] = await response.json();
        
        const filteredRepos = repos.filter(repo => 
          !GITHUB_CONFIG.excludeForks || !repo.fork
        );
        
        const projectPromises = filteredRepos.map(async repo => {
          const imageUrl = await getReadmeImageUrl(repo);
          
          return {
            id: repo.id,
            title: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            image: imageUrl,
            demo: repo.homepage || null,
            tags: repo.topics
          };
        });

        const formattedProjects = await Promise.all(projectPromises);
        setProjects(formattedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}