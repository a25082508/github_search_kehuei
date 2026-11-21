import { MAX_RESULTS, PAGE_SIZE, type SearchResults as SearchData } from './search'

type Props = {
  query: string
  page: number
  loading: boolean
  data: SearchData | null
  onPageChange: (page: number) => void
}

export function SearchResults({ query, page, loading, data, onPageChange }: Props) {
  const pages = data ? Math.ceil(Math.min(MAX_RESULTS, data.total_count) / PAGE_SIZE) : 0
  return (
    <section aria-label="Search results">
      <h2>Results for “{query}”</h2>
      <p role="status">
        {loading
          ? 'Searching GitHub…'
          : !data
            ? 'Search failed. Please try again.'
            : data.total_count === 0
              ? 'No repositories found.'
              : `${data.total_count.toLocaleString()} repositories`}
      </p>
      {data && (
        <ul>
          {data.items.map((repo) => (
            <li key={repo.id}>
              <a href={'https://github.com/' + repo.full_name}>{repo.full_name}</a>
              {repo.description && <p>{repo.description}</p>}
            </li>
          ))}
        </ul>
      )}
      {data && pages > 1 && (
        <nav aria-label="Result pages">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}
