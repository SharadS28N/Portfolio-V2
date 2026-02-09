"use client"

import useSWR from "swr"

export interface Project {
    id: number
    title: string
    description: string
    url: string
    demo?: string
    image?: string
    tags: string[]
    stars: number
    forks: number
    updatedAt: string
}

interface GitHubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    stargazers_count: number
    forks_count: number
    language: string | null
    topics: string[]
    updated_at: string
    default_branch: string
    fork: boolean
    owner: {
        login: string
    }
}

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        if (res.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.")
        }
        throw new Error(`GitHub API error: ${res.status}`)
    }
    return res.json()
}

export function useGitHubProjects(username: string = "SharadS28N") {
    const { data, error, isLoading } = useSWR<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`,
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            revalidateIfStale: false, // Don't revalidate if we have data, to save API calls
        }
    )

    const projects: Project[] = data
        ? data
            .filter((repo) => !repo.fork) // Filter out forked repositories
            .map((repo) => {
                // Construct raw content URL for image
                const imageUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/README.png`

                return {
                    id: repo.id,
                    title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                    description: repo.description || "No description provided.",
                    url: repo.html_url,
                    demo: repo.homepage || undefined,
                    image: imageUrl,
                    tags: [repo.language, ...(repo.topics || [])].filter((t): t is string => !!t),
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updatedAt: repo.updated_at,
                }
            })
        : []

    return {
        projects,
        loading: isLoading,
        error,
    }
}
