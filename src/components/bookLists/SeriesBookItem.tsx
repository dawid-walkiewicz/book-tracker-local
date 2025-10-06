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
import { TbBookOff } from "react-icons/tb"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx"

import { BookCoverLarge } from "../BookCover.tsx"
import { BookDetailsDialog } from "./BookDetailsDialog.tsx"

export const SeriesBookItem = ({
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
    <BookDetailsDialog
      book={book}
      series={series.find((s) => s.key === book.series) || null}
    >
      <Card
        key={index}
        className="flex cursor-pointer select-none bg-slate-300 dark:bg-slate-700 flex-col items-center rounded-none sm:flex-row sm:pl-2"
      >
        <p className="text-2xl font-bold w-12 text-center">{book.series_position}</p>

        <div className="w-full flex-shrink-0 justify-center pt-2 sm:w-1/6 sm:pb-2 sm:pl-2">
          <BookCoverLarge cover={book.cover_link || book.cover_i} title={book.title} />
        </div>

        <div className="flex-grow p-4 pb-0 pt-0 sm:pl-0">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription className="text-lg">
              {book.author_name ? book.author_name.join(", ") : "-"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col justify-between sm:flex-row">
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

            <div className="inline-flex rounded-lg pt-4 shadow-sm sm:pt-0">
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
