import { TbBookOff } from "react-icons/tb";

import { AddBookDialog } from "@/components/AddBookDrawer"
import { BookSearch } from "@/components/bookSearching/BookSearch"
import { DraggableBookList } from "@/components/bookLists/DraggableBookList.tsx"
import { useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { BiMoveVertical } from "react-icons/bi"
import { BookList } from "@/components/bookLists/BookList.tsx"

export const DroppedPage = () => {
  const [isDraggable, setIsDraggable] = useState(false)

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h1 className="my-2 flex items-end gap-2 text-2xl font-semibold">
          Dropped
          <TbBookOff className="size-7" />
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
            listType="dropped"
            quote="Don't spend time beating on a wall, hoping to transform it into a door."
          />
        ) : (
          <DraggableBookList
            listType="dropped"
            quote="Don't spend time beating on a wall, hoping to transform it into a door."
          />
        )}
      </div>
    </div>
  )
}
