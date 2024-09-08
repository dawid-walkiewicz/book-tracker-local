import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"

import { AddBookDialog } from "./AddBookDrawer"
import { BookSearch } from "./BookSearch"
import { DraggableBookList } from "./DraggableBookList"
import { TbBookOff } from "react-icons/tb"

export const BookList = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h2 className="mb-4 text-2xl font-bold">Reading List</h2>
        <div className="h-full">
          <AddBookDialog >
            <BookSearch />
           </AddBookDialog>
        </div>
      </div>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Currently Reading
        <GiBookmarklet className="size-7" />
      </h3>
      <DraggableBookList listType="reading" quote="A rolling stone gathers no moss." />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Plan to read
        <GiBookPile className="size-8" />
      </h3>
      <DraggableBookList listType="backlog" quote="Look before, or you'll find yourself behind." />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Completed
        <GiBookshelf className="size-8 pb-0.5" />
      </h3>
      <DraggableBookList listType="completed" quote="Well done is better than well said." />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Dropped
        <TbBookOff className="size-7" />
      </h3>
      <DraggableBookList listType="dropped" quote="Don't spend time beating on a wall, hoping to transform it into a door." />
    </div>
  )
}
