import { Book, useLibraryStore } from "@/libraryStore.ts"
import { BookItem } from "@/components/bookLists/BookItem.tsx"

export const BookList = ({
  listType,
  quote,
}: {
  listType: Book["status"]
  quote: string
}) => {
  const books = useLibraryStore((state) => state.books)

  const filteredBooks = books.filter((book) => book.status === listType)

  return (
    <div className="rounded-lg border bg-muted p-4">
      {books.filter((book) => book.status === listType).length > 0 ? (
        filteredBooks.map((book, index) => (
          <div className="mb-2">
            <BookItem book={book} index={index} listType={listType} />
          </div>
        ))
      ) : (
        <div className="p-4">
          <p className="text-primary">{quote}</p>
        </div>
      )}
    </div>
  )
}
