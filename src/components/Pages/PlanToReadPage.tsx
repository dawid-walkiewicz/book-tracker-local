import { GiBookPile } from "react-icons/gi"

import { AddBookDialog } from "@/components/AddBookDrawer"
import { BookSearch } from "@/components/bookSearching/BookSearch"
import { DraggableBookList } from "@/components/bookLists/DraggableBookList.tsx"
import { useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { BiMoveVertical } from "react-icons/bi"
import { BookList } from "@/components/bookLists/BookList.tsx"

export const PlanToReadPage = () => {
  const [isDraggable, setIsDraggable] = useState(false)

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h1 className="my-2 flex items-end gap-2 text-2xl font-semibold">
          Plan to read
          <GiBookPile className="size-8" />
        </h1>
        <div className="h-full">
          <AddBookDialog>
            <BookSearch />
          </AddBookDialog>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          variant={isDraggable ? "secondary" : "outline"}
          size="icon"
          onClick={() => setIsDraggable(!isDraggable)}
        >
          <BiMoveVertical className="size-6" />
        </Button>

        {!isDraggable ? (
          <BookList
            listType="backlog"
            quote="Look before, or you'll find yourself behind."
          />
        ) : (
          <DraggableBookList
            listType="backlog"
            quote="Look before, or you'll find yourself behind."
          />
        )}
      </div>
    </div>
  )
}
