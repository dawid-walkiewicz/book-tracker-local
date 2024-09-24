import { GiBookPile } from "react-icons/gi"

import { AddBookDialog } from "@/components/AddBookDrawer"
import { BookSearch } from "@/components/bookSearching/BookSearch"
import { BookListWithSearch } from "../bookLists/BookListWithSearch"

export const PlanToReadPage = () => {

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

      <BookListWithSearch listType="backlog" quote="Look before, or you'll find yourself behind." />
    </div>
  )
}
