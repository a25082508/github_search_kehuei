import { useState, type SubmitEvent } from 'react'
import { searchRepositories, type SearchResults as SearchData } from './search'
import { SearchResults } from './SearchResults'

type Search = { query: string; page: number }

export function App() {
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState<Search | null>(null)
  const [data, setData] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(false)

  async function requestPage(query: string, page: number) {
    setSearch({ query, page })
    setData(null)
    setLoading(true)
    const results = await searchRepositories(query, page).catch(() => null)
    setData(results)
    setLoading(false)
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    requestPage(draft.trim(), 1)
  }

  return (
    <main>
      <header>
        <h1>Repo Search</h1>
        <form onSubmit={submit} role="search">
          <label htmlFor="query">Search GitHub repositories</label>
          <div className="search-row">
            <input
              id="query"
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button disabled={loading || !draft.trim()}>Search</button>
          </div>
        </form>
      </header>
      {search && (
        <SearchResults
          query={search.query}
          page={search.page}
          loading={loading}
          data={data}
          onPageChange={(page) => requestPage(search.query, page)}
        />
      )}
    </main>
  )
}
