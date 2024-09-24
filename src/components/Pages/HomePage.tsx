import { AddBookDialog } from "@/components/AddBookDrawer.tsx"
import { BookSearch } from "@/components/bookSearching/BookSearch.tsx"
import { GiBookmarklet, GiBookPile, GiBookshelf } from "react-icons/gi"
import { TbBookOff } from "react-icons/tb"
import { BookList } from "@/components/bookLists/BookList.tsx"
import { Button } from "@/components/ui/button"
import { useLibraryStore } from "@/libraryStore"

export const HomePage = () => {
  const { importJSON, exportJSON } = useLibraryStore((state) => state)

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h2 className="mb-4 text-2xl font-bold">Reading List</h2>
        <div className="h-full">
          <AddBookDialog>
            <BookSearch />
          </AddBookDialog>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <Button variant="outline" onClick={exportJSON}>
          Export list
        </Button>

        <Button variant="outline" onClick={importJSON}>
          Import list
        </Button>
      </div>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Currently Reading
        <GiBookmarklet className="size-7" />
      </h3>
      <BookList listType="reading" quote="A rolling stone gathers no moss." />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Plan to read
        <GiBookPile className="size-8" />
      </h3>
      <BookList
        listType="backlog"
        quote="Look before, or you'll find yourself behind."
      />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Completed
        <GiBookshelf className="size-8 pb-0.5" />
      </h3>
      <BookList
        listType="completed"
        quote="Well done is better than well said."
      />

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Dropped
        <TbBookOff className="size-7" />
      </h3>
      <BookList
        listType="dropped"
        quote="Don't spend time beating on a wall, hoping to transform it into a door."
      />
    </div>
  )
}
