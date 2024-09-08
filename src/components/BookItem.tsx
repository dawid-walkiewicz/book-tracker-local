import { useLibraryStore, Book } from "@/libraryStore"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"
import { RiDeleteBin2Fill } from "react-icons/ri"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const BookItem = ({
  book,
  index,
  listType,
}: {
  book: Book
  index: number
  listType: Book["status"]
}) => {
  const { moveBook, removeBook } = useLibraryStore((state) => state)

  const moveToList = (book: Book, targetList: Book["status"]) => {
    moveBook(book, targetList)
  }

  return (
    <Card
      key={index}
      className="flex flex-col items-center sm:flex-row rounded-none sm:pl-2"
    >
      <div className="w-full sm:w-1/5 flex-shrink-0 p-2 justify-center">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={`Cover of ${book.title}`}
          className="h-full w-3/4 object-cover sm:w-full sm:h-full sm:rounded-l-lg rounded-lg mx-auto"
        />
      </div>

      <div className="flex-grow p-4 pb-0 pt-0 sm:pl-0">
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{book.author_name.join(", ")}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" onClick={() => removeBook(book)}>
                <span className="hidden sm:inline">Remove</span>
                <span className="inline sm:hidden">
                  <RiDeleteBin2Fill className="size-4" aria-hidden="true" />
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete book from reading list</TooltipContent>
          </Tooltip>

          <div className="inline-flex rounded-lg shadow-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-l-md rounded-r-none border-r-0"
                  variant="outline"
                  onClick={() => moveToList(book, "reading")}
                  disabled={listType === "reading"}
                >
                  <GiBookmarklet className="size-4 sm:size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as "Currently Reading"</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-l-none rounded-r-none"
                  variant="outline"
                  onClick={() => moveToList(book, "backlog")}
                  disabled={listType === "backlog"}
                >
                  <GiBookPile className="size-5 sm:size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as "Plan to read"</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-l-none rounded-r-md border-l-0"
                  variant="outline"
                  onClick={() => moveToList(book, "completed")}
                  disabled={listType === "completed"}
                >
                  <GiBookshelf className="size-5 pb-0.5 sm:size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as "Completed"</TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </div>
    </Card>
  )

  
}
