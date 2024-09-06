import { useStore, Book } from "@/store"

import {
  Card,
  CardContent,
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
  const { moveBook, removeBook } = useStore(
    (state) => state,
  )

  const moveToList = (book: Book, targetList: Book["status"]) => {
    moveBook(book, targetList)
  }

  return (
    <Card
      key={index}
      className="rounded-none first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author_name}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* <Button variant="destructive" onClick={() => removeBook(book)}>
              Remove
            </Button> */}
            <Button
              className="sm:bg-destructive"
              variant="outline"
              onClick={() => removeBook(book)}
            >
              <span className="hidden sm:inline">Remove</span>
              {/* Widoczny na większych ekranach */}
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
                onClick={() => moveToList(book, "inProgress")}
                disabled={listType === "inProgress"}
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
                onClick={() => moveToList(book, "done")}
                disabled={listType === "done"}
              >
                <GiBookshelf className="size-5 pb-0.5 sm:size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mark as "Completed"</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  )
}
