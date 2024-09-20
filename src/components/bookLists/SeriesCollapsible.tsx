import { Book, Series } from "@/libraryStore.ts"
import { BookItem } from "@/components/bookLists/BookItem.tsx"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookCoverMedium } from "@/components/BookCover.tsx"

const SeriesCollapsible = ({
  books,
  series,
}: {
  books: Book[]
  series: Series
}) => {
  const coverMiniatures = (books: Book[]) => {
    const items = []
    for (let i = 0; i < books.length && i < 3; i++) {
      if (books[i].cover_i === undefined || books[i].cover_i === null) continue
      items.push(
        <div className={`z-${50 - i * 10} ${i === 0 ? "" : "-ml-16"}`}>
          <BookCoverMedium
            coverId={books[i].cover_i}
            title={`Cover for ${books[i].title}`}
          />
        </div>,
      )
    }

    if (items.length < 3) {
      for (let i = items.length; i < 3; i++) {
        items.push(
          <div className={`z-${50 - i * 10} ${i === 0 ? "" : "-ml-16"}`}>
            <BookCoverMedium coverId={null} title={"Empty cover"} />
          </div>,
        )
      }
    }
    return <div className="relative z-40 flex">{items}</div>
  }

  const extractAuthors = (books: Book[]) => {
    const authors = books.map((book) => book.author_name)
    const uniqueAuthors = authors.flat().filter((author, index, self) => {
      return self.indexOf(author) === index
    })

    return uniqueAuthors.join(", ")
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full text-left">
        <Card className="flex cursor-pointer select-none flex-col items-center rounded-none sm:flex-row sm:pl-2">
          <div className="p-2">{coverMiniatures(books)}</div>

          <div className="flex-grow">
            <CardHeader>
              <CardTitle>{series.name}</CardTitle>
              <CardDescription className="text-md">
                <p className="text-lg">{extractAuthors(books)}</p>
                <p>{`Volumes: ${books.length}`}</p>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col justify-between sm:flex-row"></CardFooter>
          </div>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 sm:pl-8 sm:pr-0">
          {books
            .sort((a, b) => (a.series_position || 0) - (b.series_position || 0))
            .map((book, index) => (
              <BookItem book={book} index={index} listType="reading" />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SeriesCollapsible
