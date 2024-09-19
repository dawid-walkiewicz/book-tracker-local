import { GiBookshelf } from "react-icons/gi"

import { AddBookDialog } from "@/components/AddBookDrawer"
import { BookSearch } from "@/components/bookSearching/BookSearch"
import { DraggableBookList } from "@/components/bookLists/DraggableBookList.tsx"
import { Button } from "@/components/ui/button.tsx"
import { BiMoveVertical } from "react-icons/bi"
import { useState } from "react"
import { BookList } from "@/components/bookLists/BookList.tsx"

export const CompletedPage = () => {
  const [isDraggable, setIsDraggable] = useState(false)

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h1 className="my-2 flex items-end gap-2 text-2xl font-semibold">
          Completed
          <GiBookshelf className="size-8 pb-0.5" />
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
            listType="completed"
            quote="Well done is better than well said."
          />
        ) : (
          <DraggableBookList
            listType="completed"
            quote="Well done is better than well said."
          />
        )}
      </div>
    </div>
  )
}
