export const PAGE_SIZE = 10
// GitHub limits each search to the first 1,000 results.
export const MAX_RESULTS = 1000

type Repository = { id: number; full_name: string; description: string | null }
export type SearchResults = { total_count: number; items: Repository[] }

export async function searchRepositories(query: string, page: number): Promise<SearchResults> {
  const params = new URLSearchParams({ q: query, per_page: String(PAGE_SIZE), page: String(page) })
  const response = await fetch('https://api.github.com/search/repositories?' + params)
  if (!response.ok) throw new Error('Search failed')
  return response.json()
}
