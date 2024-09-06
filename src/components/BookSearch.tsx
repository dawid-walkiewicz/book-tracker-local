import axios from "axios"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Book, useStore } from "@/store"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { SlArrowRight, SlArrowLeft } from "react-icons/sl"

type SearchResult = {
  docs: Book[]
  numFound: number
}

export const BookSearch = () => {
  const { books, addBook } = useStore((state) => state)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 15

  const searchBooks = async (page: number = 1) => {
    if (!query) return

    setIsLoading(true)

    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`,
      )

      setResults(response.data.docs)
      setTotalResults(response.data.numFound)
      setCurrentPage(page)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchBooks()
    }
  }

  const handlePrevoiusPage = () => {
    if (currentPage <= 1) return
    searchBooks(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage >= Math.ceil(totalResults / resultsPerPage)) return
    searchBooks(currentPage + 1)
  }

  const startIndex = (currentPage - 1) * resultsPerPage + 1
  const endIndex = Math.min(currentPage * resultsPerPage, totalResults)

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
          // className="max-sm:w-full sm:max-w-xs"
          onClick={() => searchBooks()}
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

        <Button
          onClick={() => console.log("Not implemented")}
          disabled={isLoading}
        >
          Create
        </Button>
      </div>
    </div>
  )

  const SearchResults = (
    <div className="block max-h-[200px] overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
      {query.length > 0 && results.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>{" "}
              {/* hide cell when screen is small */}
              <TableHead className="hidden sm:table-cell">Page Count</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {results.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author_name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {book.first_publish_year}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {book.number_of_pages_median || "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    disabled={books.some((b) => b.key === book.key)}
                    onClick={() =>
                      addBook({
                        ...book,
                        status: "backlog",
                      })
                    }
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

  const SearchPagination = (
    <div className="flex w-full flex-col items-center gap-3 border-t px-6 py-4 sm:flex-row sm:justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalResults > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {startIndex} - {endIndex}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {totalResults}
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
            currentPage >= Math.ceil(totalResults / resultsPerPage) || isLoading
          }
        >
          <SlArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="sm:divide-y sm:divide-muted sm:rounded-2xl sm:border">
        {SearchAndCreateInput}
        {SearchResults}
        {SearchPagination}
      </div>
    </div>
  )
}
