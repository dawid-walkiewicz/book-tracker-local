import { DraggableBookList } from "@/components/bookLists/DraggableBookList.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { BiMoveVertical } from "react-icons/bi"
import { useState } from "react"
import { BookList } from "@/components/bookLists/BookList.tsx"

// import { IoMdSearch } from "react-icons/io"
import { Book, useLibraryStore } from "@/libraryStore"
import { set } from "react-hook-form"

export const BookListWithSearch = ({
  listType,
  quote,
}: {
  listType: Book["status"]
  quote: string
}) => {
  const { books, series } = useLibraryStore((state) => state)

  const [isDraggable, setIsDraggable] = useState(false)
  const [query, setQuery] = useState("")

  const filteredBooks = books
    .filter((book) => book.status === listType)
    .filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author_name.some((author) =>
          author.toLowerCase().includes(query.toLowerCase())
        ) ||
        (book.series && series.find((s) => s.key === book.series)?.name.toLowerCase().includes(query.toLowerCase()))
    )

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsDraggable(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Title, author, series..."
          value={query}
          onChange={handleValueChange}
        />
        {/* <Button type="submit">
          <IoMdSearch className="size-6" />
        </Button> */}
      </div>

      <Button
        variant={isDraggable ? "secondary" : "outline"}
        size="icon"
        disabled={filteredBooks.length === 0 || query.length > 0}
        onClick={() => setIsDraggable(!isDraggable)}
      >
        <BiMoveVertical className="size-6" />
      </Button>

      {!isDraggable ? (
        <BookList
          filteredBooks={filteredBooks}
          listType={listType}
          quote={quote}
        />
      ) : (
        <DraggableBookList
          filteredBooks={filteredBooks}
          listType={listType}
          quote={quote}
        />
      )}
    </div>
  )
}
