import { useLibraryStore, Book } from "@/libraryStore.ts"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"

import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { TbBookOff } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx"

import { BookCoverLarge } from "../BookCover.tsx"
import { BookDetailsDialog } from "./BookDetailsDialog.tsx"

export const BookItem = ({
  book,
  index,
  listType,
}: {
  book: Book
  index: number
  listType: Book["status"]
}) => {
  const { moveBook, removeBook, series } = useLibraryStore((state) => state)

  const moveToList = (book: Book, targetList: Book["status"]) => {
    moveBook(book, targetList)
  }

  return (
    <BookDetailsDialog book={book} series={series.find((s) => s.key === book.series) || null}>
      <Card
        key={index}
        className="flex flex-col items-center rounded-none pt-2 sm:pb-2 sm:flex-row sm:pl-2 cursor-pointer select-none"
      >
        <div className="w-full flex-shrink-0 justify-center pt-2 sm:pb-2 sm:pl-2 sm:w-1/6">
          <BookCoverLarge coverId={book.cover_i} title={book.title} />
        </div>

        <div className="flex-grow p-4 pb-0 pt-0 sm:pl-0">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription className="text-lg">{book.author_name ? book.author_name.join(", ") : "-"}</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col sm:flex-row justify-between">
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

            <div className="pt-4 sm:pt-0 inline-flex rounded-lg shadow-sm">
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
                    className="rounded-l-none rounded-r-none border-r-0"
                    variant="outline"
                    onClick={() => moveToList(book, "completed")}
                    disabled={listType === "completed"}
                  >
                    <GiBookshelf className="size-5 pb-0.5 sm:size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark as "Completed"</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-l-none rounded-r-none border-r-0"
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
                    className="rounded-l-none rounded-r-md"
                    variant="outline"
                    onClick={() => moveToList(book, "dropped")}
                    disabled={listType === "dropped"}
                  >
                    <TbBookOff className="size-5 sm:size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark as "Dropped"</TooltipContent>
              </Tooltip>

            </div>
          </CardFooter>
        </div>
      </Card>
    </BookDetailsDialog>
  )
}
