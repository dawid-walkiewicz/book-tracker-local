import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookCoverLarge } from "./BookCover"
import { Book } from "@/libraryStore"
import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"
import { TbBookOff } from "react-icons/tb"

import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

export default () => <VisuallyHidden.Root />

import { useNavigate } from "react-router-dom"
import { DialogDescription } from "@radix-ui/react-dialog"

export const BookDetailsDialog = ({
  book,
  children,
}: {
  book: Book
  children: React.ReactNode
}) => {
  const navigate = useNavigate()

  const readingStatus = (status: Book["status"]) => {
    switch (status) {
      case "reading":
        return (
          <div className="flex items-center gap-2">
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
              Details of {book.title} by {book.author_name.join(", ")}
            </VisuallyHidden.Root>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row sm:justify-evenly">
          <div className="w-full sm:w-1/3 justify-center">
            <BookCoverLarge coverId={book.cover_i} title="Cover" />
          </div>

          <div className="flex flex-col justify-around items-center text-center gap-4 sm:items-start sm:text-left sm:gap-0">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold sm:text-4xl">{book.title}</h2>
              <h3 className="text-2xl font-semibold">
                {book.author_name.join(", ")}
              </h3>
            </div>

            {readingStatus(book.status)}

            <div className="flex flex-col gap-1">
              <p>Publisher(s): {book.publishers?.join(", ")}</p>
              <p>Published year: {book.publish_year}</p>
              <p>Number of pages: {book.number_of_pages || "-"}</p>
              <p>Format: {book.format}</p>
            </div>

            <Button
              className="mx-auto max-w-fit"
              onClick={() => navigate(`/edit/${book.key}`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
