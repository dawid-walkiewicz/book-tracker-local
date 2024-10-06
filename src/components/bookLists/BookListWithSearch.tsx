import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { BiSort } from "react-icons/bi"
import { useState } from "react"
import { BookList } from "@/components/bookLists/BookList.tsx"
import { Book, useLibraryStore } from "@/libraryStore"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const BookListWithSearch = ({
  listType,
  quote,
}: {
  listType: Book["status"]
  quote: string
}) => {
  const { books, series } = useLibraryStore((state) => state)

  const [reverseSort, setReverseSort] = useState(false)
  const [sortType, setSortType] = useState("position")
  const [query, setQuery] = useState("")

  const filteredBooks = books
    .filter((book) => book.status === listType)
    .filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author_name.some((author) =>
          author.toLowerCase().includes(query.toLowerCase()),
        ) ||
        (book.series &&
          series
            .find((s) => s.key === book.series)
            ?.name.toLowerCase()
            .includes(query.toLowerCase())),
    )

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSortTypeChange = (value: string) => {
    setSortType(value)
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
      </div>

      <div className="flex">
        <Button
          variant="ghost"
          className={ reverseSort ? "bg-gray-200" : "" }
          size="icon"
          disabled={filteredBooks.length === 0 || query.length > 0}
          onClick={() => setReverseSort(!reverseSort)}
        >
          <BiSort className="size-6" />
        </Button>

        <Select onValueChange={handleSortTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="position">Position</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="series">Series</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BookList
        filteredBooks={filteredBooks}
        listType={listType}
        quote={quote}
        sortType={sortType}
        reverseSort={reverseSort}
      />
    </div>
  )
}
