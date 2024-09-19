import { Button } from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { BookCoverLarge } from "../BookCover.tsx"
import { Book, Series } from "@/libraryStore.ts"
import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"
import { TbBookOff } from "react-icons/tb"

import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

import { useNavigate } from "react-router-dom"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"

type StatusType = "completed" | "reading" | "backlog" | "dropped";

export const BookDetailsDialog = ({
  book,
  series,
  children,
}: {
  book: Book
  series: Series | null
  children: React.ReactNode
}) => {
  const navigate = useNavigate()

  const [status, setStatus] = useState<StatusType>(book.status)

  const readingStatus = (status: Book["status"]) => {
    switch (status) {
      case "reading":
        return (
          <div className="mr-2 flex items-center gap-2">
            <GiBookmarklet className="size-6" />{" "}
            <p className="text-xl text-yellow-400">Currently reading</p>
          </div>
        )
      case "backlog":
        return (
          <div className="flex items-center gap-2">
            <GiBookPile className="size-6" />
            <p className="text-xl">Plan to read</p>
          </div>
        )
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <GiBookshelf className="size-6" />
            <p className="text-xl text-green-800">Completed</p>
          </div>
        )
      case "dropped":
        return (
          <div className="flex items-center gap-2">
            <TbBookOff className="size-6" />
            <p className="text-xl text-red-600">Dropped</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:min-h-[300px] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden.Root>Book details</VisuallyHidden.Root>
          </DialogTitle>
          <DialogDescription>
            <VisuallyHidden.Root>
              Details of {book.title} by{" "}
              {book.author_name ? book.author_name.join(", ") : "-"}
            </VisuallyHidden.Root>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:min-h-72 sm:flex-row sm:justify-evenly sm:gap-8">
          <div className="flex w-full items-center justify-center sm:w-1/3">
            <BookCoverLarge coverId={book.cover_i} title="Cover" />
          </div>

          <div className="flex flex-col items-center gap-4 text-center sm:w-2/3 sm:items-start sm:text-left">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold sm:text-4xl">{book.title}</h2>
              <h3 className="text-2xl font-semibold">
                {book.author_name ? book.author_name.join(", ") : "-"}
              </h3>
            </div>

            {/*{readingStatus(book.status)}*/}
            <Select defaultValue={status} onValueChange={(value: StatusType) => {
              setStatus(value)
              console.log(value)
            }}>
              <SelectTrigger className="max-w-fit">
                <SelectValue>{readingStatus(status)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reading">
                  <div className="mr-2 flex items-center gap-2">
                    <GiBookmarklet className="size-6" />{" "}
                    <p className="text-lg text-yellow-400">Currently reading</p>
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center gap-2">
                    <GiBookshelf className="size-6" />
                    <p className="text-lg text-green-800">Completed</p>
                  </div>
                </SelectItem>
                <SelectItem value="backlog">
                  <div className="flex items-center gap-2">
                    <GiBookPile className="size-6" />
                    <p className="text-lg">Plan to read</p>
                  </div>
                </SelectItem>
                <SelectItem value="dropped">
                  <div className="flex items-center gap-2">
                    <TbBookOff className="size-6" />
                    <p className="text-lg text-red-600">Dropped</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-1">
              <p>Publisher(s): {book.publishers?.join(", ")}</p>
              {series && (
                <p>
                  Series: {series.name || "-"}{" "}
                  {book.series_position ? ` #${book.series_position}` : ""}
                </p>
              )}
              <p>Published year: {book.publish_year}</p>
              <p>Number of pages: {book.number_of_pages || "-"}</p>
              <p>Format: {book.format}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="sm:w-1/3"></div>
          <Button
            className="mx-auto max-w-fit"
            onClick={() => navigate(`/edit/${book.key}`)}
          >
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
