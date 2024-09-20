import { Book, useLibraryStore } from "@/libraryStore.ts"
import { BookItem } from "@/components/bookLists/BookItem.tsx"
import SeriesCollapsible from "@/components/bookLists/SeriesCollapsible.tsx"

export const BookList = ({
  listType,
  quote,
}: {
  listType: Book["status"]
  quote: string
}) => {
  const { books, series } = useLibraryStore((state) => state)

  const filteredBooks = books.filter((book) => book.status === listType)

  const groupBooksBySeries = filteredBooks.reduce(
    (acc, book) => {
      const seriesKey = book.series || "No Series"

      if (!acc[seriesKey]) {
        acc[seriesKey] = []
      }
      acc[seriesKey].push(book)

      return acc
    },
    {} as { [key: string]: Book[] },
  )

  return (
    <div className="rounded-lg border bg-muted p-4">
      {filteredBooks.length > 0 ? (
        Object.entries(groupBooksBySeries).map(([seriesKey, booksInSeries]) => {
          if (seriesKey === "No Series" || booksInSeries.length === 1) {
            return booksInSeries.map((book, index) => (
              <div key={book.key} className="mb-2">
                <BookItem book={book} index={index} listType={listType} />
              </div>
            ));
          }

          const seriesData = series.find((s) => s.key === seriesKey);
          if (!seriesData) {
            return null;
          }

          return (
            <SeriesCollapsible
              key={seriesKey}
              books={booksInSeries}
              series={seriesData}
            />
          );
        })
      ) : (
        <div className="p-4">
          <p className="text-primary">{quote}</p>
        </div>
      )}
    </div>
  )
}
