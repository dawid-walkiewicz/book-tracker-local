import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { BookCoverSmall } from "@/components/BookCover"

import { IoMdArrowBack } from "react-icons/io"

import { Book, useLibraryStore } from "@/libraryStore"
import { useNavigate } from "react-router-dom"

export const EditionsList = ({
  query,
  editionResults,
  setEditionResults,
  setIsEditionsVisible,
}: {
  query: string
  editionResults: Book[]
  setEditionResults: (value: Book[]) => void
  setIsEditionsVisible: (value: boolean) => void
}) => {
  const navigate = useNavigate()

  const { books, addBook } = useLibraryStore((state) => state)

  return (
    <div className="block pb-4 pl-2 pr-2 sm:pb-0 sm:pl-0 sm:pr-0 max-h-[200px] overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
      {query.length > 0 && editionResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center justify-center">
                <IoMdArrowBack
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    setIsEditionsVisible(false)
                    setEditionResults([])
                  }}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Author</TableHead>
              <TableHead>Publishers</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>{" "}
              <TableHead className="hidden sm:table-cell">Page Count</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {editionResults.map((book, index) => (
              <TableRow key={index}>
                <TableCell className="mr-0 p-2">
                  <div className="w-12 sm:w-16">
                    <BookCoverSmall coverId={book.cover_i} title={book.title} />
                  </div>
                </TableCell>
                <TableCell className="pl-0">{book.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
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
                      const cleanedKey = book.key.replace("/books/", "")
                      addBook({
                        ...book,
                        key: cleanedKey,
                        status: "backlog",
                      })
                      console.log(book)
                      setIsEditionsVisible(false)
                      setEditionResults([])

                      navigate(`/edit/${cleanedKey}`)
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
          <p className="text-gray-600 dark:text-gray-400">
            There are no editions available
          </p>
        </div>
      )}
    </div>
  )
}
