import axios from "axios"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Book, Work, useLibraryStore } from "@/libraryStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"

import { BookCoverMedium } from "./BookCover"

import { useNavigate } from "react-router-dom"

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
  publish_date: number
  publishers: string[]
  physical_format: string
  covers: number[] | null
  number_of_pages: number | null
  isbn: string[]
}

export const BookSearch = () => {
  const { books, addBook } = useLibraryStore((state) => state)

  const [query, setQuery] = useState("")
  const [workResults, setWorkResults] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalWorkResults, setTotalWorkResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 15

  const [isEditionsVisible, setIsEditionsVisible] = useState(false)
  const [editionResults, setEditionResults] = useState<Book[]>([])

  const navigate = useNavigate()

  const searchWorks = async (page: number = 1) => {
    if (!query) return

    setIsLoading(true)

    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}&lang=pl&fields=key,title,author_name,cover_i,editions`,
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
      setCurrentPage(page)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  const searchEditions = async (editions: string[], authors: string[]) => {
    if (editions.length === 0) return

    console.log(editions)

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
              publish_year: response.data.publish_date,
              publishers: response.data.publishers,
              physical_format: response.data.physical_format,
              cover_i: cover,
              number_of_pages: response.data.number_of_pages,
              isbn: response.data.isbn,
              status: "backlog",
            },
          ])
          }
        }
        else {
          setEditionResults((prev) => [
            ...prev,
            {
              key: response.data.key,
              title: response.data.title,
              author_name: authors,
              publish_year: response.data.publish_date,
              publishers: response.data.publishers,
              physical_format: response.data.physical_format,
              cover_i: null,
              number_of_pages: response.data.number_of_pages,
              isbn: response.data.isbn,
              status: "backlog",
            },
          ])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditionsVisible(false)
      searchWorks()
    }
  }

  const handlePrevoiusPage = () => {
    if (currentPage <= 1) return
    searchWorks(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage >= Math.ceil(totalWorkResults / resultsPerPage)) return
    searchWorks(currentPage + 1)
  }

  const startIndex = (currentPage - 1) * resultsPerPage + 1
  const endIndex = Math.min(currentPage * resultsPerPage, totalWorkResults)

  const SearchAndCreateInput = (
    <div className="flex flex-col items-center gap-3 px-4 py-3 sm:flex-row">
      <div className="relative w-full sm:max-w-xs">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Search for a book"
        />
      </div>

      <div className="inline-flex gap-3">
        <Button
          onClick={() => {
            setIsEditionsVisible(false)
            setEditionResults([])
            searchWorks()
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />{" "}
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>

        <Button onClick={() => navigate("/add")} disabled={isLoading}>
          Create
        </Button>
      </div>
    </div>
  )

  const SearchResults = (
    <div className="block max-h-[200px] overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
      {query.length > 0 && workResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>{" "}
              {/* hide cell when screen is small */}
              <TableHead className="hidden sm:table-cell">Page Count</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {workResults.map((work, index) => (
              <TableRow key={index}>
                <TableCell className="mr-0 p-2">
                  <BookCoverMedium coverId={work.cover_i} title={work.title} />
                </TableCell>
                <TableCell className="pl-0">{work.title}</TableCell>
                <TableCell>
                  {work.author_name ? work.author_name.join(", ") : ""}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {work.first_publish_year}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {work.number_of_pages_median || "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    disabled={work.editions.length === 0}
                    onClick={() => {
                      searchEditions(work.editions, work.author_name)
                      setIsEditionsVisible(true)

                      console.log(work)

                      // navigate(`/edit/${cleanedKey}`)
                    }}
                  >
                    Editions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex max-h-60 items-center justify-center p-16">
          <p className="text-gray-600 dark:text-gray-400">Start your search!</p>
        </div>
      )}
    </div>
  )

  const SearchPagination = (
    <div className="flex w-full flex-col items-center gap-3 border-t px-6 py-4 sm:flex-row sm:justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalWorkResults > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {startIndex} - {endIndex}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {totalWorkResults}
              </span>{" "}
              results
            </>
          ) : (
            "0 results"
          )}
        </p>
      </div>
      <div className="inline-flex gap-x-2">
        <Button
          variant="outline"
          onClick={handlePrevoiusPage}
          disabled={currentPage <= 1 || isLoading}
        >
          <SlArrowLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={
            currentPage >= Math.ceil(totalWorkResults / resultsPerPage) ||
            isLoading
          }
        >
          <SlArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )

  const EditionsList = (
    <div className="block max-h-[200px] overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
      {query.length > 0 && workResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publishers</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>{" "}
              {/* hide cell when screen is small */}
              <TableHead className="hidden sm:table-cell">Page Count</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {editionResults.map((book, index) => (
              <TableRow key={index}>
                <TableCell className="mr-0 p-2">
                  <BookCoverMedium coverId={book.cover_i} title={book.title} />
                </TableCell>
                <TableCell className="pl-0">{book.title}</TableCell>
                <TableCell>
                  {book.author_name ? book.author_name.join(", ") : ""}
                </TableCell>
                <TableCell>
                  {book.publishers ? book.publishers.join(", ") : ""}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {book.publish_year}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {book.number_of_pages || "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    disabled={books.some((b) => b.key === book.key)}
                    onClick={() => {
                      addBook({
                        ...book,
                        status: "backlog",
                      })
                      console.log(book)
                      setIsEditionsVisible(false)
                      setEditionResults([])

                      // const cleanedKey = work.key.replace("/books/", "")

                      // navigate(`/edit/${cleanedKey}`)
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex max-h-60 items-center justify-center p-16">
          <p className="text-gray-600 dark:text-gray-400">Start your search!</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="sm:divide-y sm:divide-muted sm:rounded-2xl sm:border">
        {SearchAndCreateInput}
        {isEditionsVisible ? EditionsList : SearchResults}
        {/* {SearchResults} */}
        {SearchPagination}
      </div>
    </div>
  )
}
