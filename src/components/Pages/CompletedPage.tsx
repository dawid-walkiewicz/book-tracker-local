import { GiBookshelf } from "react-icons/gi"

import { AddBookDialog } from "@/components/AddBookDrawer"
import { BookSearch } from "@/components/BookSearch"
import { DraggableBookList } from "@/components/DraggableBookList"

export const CompletedPage = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="h-full">
          <AddBookDialog>
            <BookSearch />
          </AddBookDialog>
        </div>
      </div>

      <h1 className="my-2 flex items-end gap-2 text-2xl font-semibold">
        Completed
        <GiBookshelf className="size-8 pb-0.5" />
      </h1>
      <DraggableBookList listType="completed" quote="Well done is better than well said." />
    </div>
  )
}
