import { Book } from "@/libraryStore.ts"

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

import { BookCoverLarge } from "../BookCover.tsx"

export const DragBookItem = ({
  book,
  index,
}: {
  book: Book
  index: number
  listType: Book["status"]
}) => {
  return (
    <Card
      key={index}
      className="flex cursor-pointer select-none flex-col items-center rounded-none sm:flex-row sm:pl-2"
    >
      <div className="w-full flex-shrink-0 justify-center pt-2 sm:w-1/6 sm:pb-2 sm:pl-2">
        <BookCoverLarge coverId={book.cover_i} title={book.title} />
      </div>

      <div className="flex-grow p-4 pb-0 pt-0 sm:pl-0">
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription className="text-md">
            {book.author_name ? book.author_name.join(", ") : "-"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col justify-between sm:flex-row">
          <Button variant="destructive" disabled={true}>
            <span className="hidden sm:inline">Remove</span>
            <span className="inline sm:hidden">
              <RiDeleteBin2Fill className="size-4" aria-hidden="true" />
            </span>
          </Button>

          <div className="inline-flex rounded-lg pt-4 shadow-sm sm:pt-0">
            <Button
              className="rounded-l-md rounded-r-none border-r-0"
              variant="outline"
              disabled={true}
            >
              <GiBookmarklet className="size-4 sm:size-5" />
            </Button>

            <Button
              className="rounded-l-none rounded-r-none border-r-0"
              variant="outline"
              disabled={true}
            >
              <GiBookshelf className="size-5 pb-0.5 sm:size-6" />
            </Button>

            <Button
              className="rounded-l-none rounded-r-none border-r-0"
              variant="outline"
              disabled={true}
            >
              <GiBookPile className="size-5 sm:size-6" />
            </Button>

            <Button
              className="rounded-l-none rounded-r-md"
              variant="outline"
              disabled={true}
            >
              <TbBookOff className="size-5 sm:size-6" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
