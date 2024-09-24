import axios from "axios"
import { useState } from "react"

import { Book, Work } from "@/libraryStore"

import { SearchBar } from "@/components/bookSearching/SearchBar"
import { SearchResults } from "@/components/bookSearching/SearchResults"
import { SearchPagination } from "@/components/bookSearching/SearchPagination"
import { EditionsList } from "@/components/bookSearching/EditionsList"

type SearchResult = {
  docs: WorkResults[]
  numFound: number
}

type WorkResults = {
  key: string
  title: string
  author_name: string[]
  first_publish_year: number
  number_of_pages_median: number
  cover_i: number | null
  editions: { docs: { key: string }[] }
  status: "completed" | "reading" | "backlog" | "dropped"
}

type Edition = {
  key: string
  title: string
  author_name: string[]
  publish_date: string
  publishers: string[]
  physical_format: string
  covers: number[] | null
  number_of_pages: number | null
  isbn: string[]
}

export const BookSearch = () => {
  const [query, setQuery] = useState("")
  const [wasSearched, setWasSearched] = useState(false)
  const [workResults, setWorkResults] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalWorkResults, setTotalWorkResults] = useState(0)
  const resultsPerPage = 15

  const [isEditionsVisible, setIsEditionsVisible] = useState(false)
  const [editionResults, setEditionResults] = useState<Book[]>([])

  const searchWorks = async (page: number = 1) => {
    if (!query) return

    setIsLoading(true)

    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}&lang=pl&fields=key,title,author_name,first_publish_year,number_of_pages_median,cover_i,editions`,
      )

      const processedWorks = response.data.docs.map((work) => {
        const editionsArray =
          work.editions?.docs.map((edition) => edition.key) || []

        return {
          ...work,
          editions: editionsArray,
        }
      })

      setWorkResults(processedWorks.filter((work) => work.editions.length > 0))
      setTotalWorkResults(response.data.numFound)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
    setWasSearched(true)
  }

  function extractYear(publishYear: string | null | undefined): number | null {
    if (!publishYear) return null
  
    const match = publishYear.match(/\b\d{4}\b/)
    if (match) {
      return parseInt(match[0], 10)
    }
  
    return null
  }

  const searchEditions = async (editions: string[], authors: string[]) => {
    if (editions.length === 0) return

    try {
      for (const edition of editions) {
        const response = await axios.get<Edition>(
          `https://openlibrary.org${edition}.json`,
        )

        if (response.data.covers) {
          for (const cover of response.data.covers) {
            setEditionResults((prev) => [
              ...prev,
              {
                key: response.data.key,
                title: response.data.title,
                author_name: authors,
                publish_year: extractYear(response.data.publish_date),
                publishers: response.data.publishers,
                format: response.data.physical_format,
                cover_i: cover,
                number_of_pages: response.data.number_of_pages,
                series: null,
                series_position: null,
                status: "backlog",
              },
            ])
          }
        } else {
          setEditionResults((prev) => [
            ...prev,
            {
              key: response.data.key,
              title: response.data.title,
              author_name: authors,
              publish_year: extractYear(response.data.publish_date),
              publishers: response.data.publishers,
              format: response.data.physical_format,
              cover_i: null,
              number_of_pages: response.data.number_of_pages,
              series: null,
              series_position: null,
              status: "backlog",
            },
          ])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="sm:divide-y sm:divide-muted sm:rounded-2xl sm:border">
        <SearchBar
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          searchWorks={searchWorks}
          setIsEditionsVisible={setIsEditionsVisible}
          setEditionResults={setEditionResults}
        />
        {isEditionsVisible ? (
          <div>
            <EditionsList
              query={query}
              editionResults={editionResults}
              setEditionResults={setEditionResults}
              setIsEditionsVisible={setIsEditionsVisible}
            />
          </div>
        ) : (
          <div>
            <SearchResults
              query={query}
              wasSearched={wasSearched}
              workResults={workResults}
              setIsEditionsVisible={setIsEditionsVisible}
              searchEditions={searchEditions}
            />
            <SearchPagination
              totalWorkResults={totalWorkResults}
              isLoading={isLoading}
              searchWorks={searchWorks}
            />
          </div>
        )}
      </div>
    </div>
  )
}
