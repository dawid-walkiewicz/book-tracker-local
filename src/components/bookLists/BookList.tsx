import { Book, useLibraryStore } from "@/libraryStore.ts"
import { BookItem } from "@/components/bookLists/BookItem.tsx"
import SeriesCollapsible from "@/components/bookLists/SeriesCollapsible.tsx"
import { useEffect, useState } from "react"

type Item = {
  key: string
  name: string
  type: "book" | "series"
  data: Book[]
}

export const BookList = ({
  filteredBooks,
  listType,
  quote,
  sortType,
  reverseSort,
}: {
  filteredBooks: Book[]
  listType: Book["status"]
  quote: string
  sortType: string
  reverseSort: boolean
}) => {
  const { series } = useLibraryStore((state) => state)

  const groupedItems: Item[] = filteredBooks.reduce((acc: Item[], book) => {
    const seriesKey = book.series || "No Series"

    const existingSeries = acc.find((item) => item.key === seriesKey)

    if (existingSeries) {
      if (existingSeries.type === "series") {
        existingSeries.data.push(book)
      }
    } else {
      if (seriesKey === "No Series" || !book.series) {
        acc.push({
          key: book.key,
          name: book.title,
          type: "book",
          data: [book],
        })
      } else {
        acc.push({
          key: seriesKey,
          name: series.find((s) => s.key === seriesKey)?.name || seriesKey,
          type: "series",
          data: [book],
        })
      }
    }

    return acc
  }, [])

  const finalItems: Item[] = groupedItems.map((item) => {
    if (item.type === "series" && item.data.length === 1) {
      return {
        key: item.data[0].key,
        name: item.data[0].title,
        type: "book",
        data: item.data,
      }
    }
    return item
  })

  const [sortedBooks, setSortedBooks] = useState<Item[]>(finalItems)

  const sortBooks = () => {
    let sorted = [...finalItems]

    if (sortType === "title") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortType === "author") {
      sorted = sorted.sort((a, b) =>
        a.data[0].author_name[0].localeCompare(b.data[0].author_name[0]),
      )
    } else if (sortType === "series") {
      sorted = sorted.sort((a, b) => {
        if (a.type === "series" && b.type === "book") return -1
        if (a.type === "book" && b.type === "series") return 1

        if (a.type === "series" && b.type === "series") {
          return a.name.localeCompare(b.name)
        }

        return 0
      })
    }

    if (reverseSort) {
      sorted.reverse()
    }

    setSortedBooks(sorted)
  }

  useEffect(() => {
    sortBooks()
  }, [sortType, reverseSort, finalItems])

  return (
    <div className="rounded-lg border bg-muted p-4">
      {filteredBooks.length > 0 ? (
        sortedBooks.map((item) => {
          if (item.type === "book") {
            return item.data.map((book, index) => (
              <div key={book.key} className="mb-2">
                <BookItem book={book} index={index} listType={listType} />
              </div>
            ))
          } else if (item.type === "series") {
            const seriesData = series.find((s) => s.key === item.key)
            if (!seriesData) {
              return null
            }

            return (
              <div key={item.key} className="mb-2">
                <SeriesCollapsible books={item.data} series={seriesData} />
              </div>
            )
          }

          return null
        })
      ) : (
        <div className="p-4">
          <p className="text-primary">{quote}</p>
        </div>
      )}
    </div>
  )
}
