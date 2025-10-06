import { AddBookDialog } from "@/components/AddBookDrawer.tsx"
import { BookSearch } from "@/components/bookSearching/BookSearch.tsx"
import { Button } from "@/components/ui/button"
import { Book, useLibraryStore } from "@/libraryStore"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { BookCoverSmall } from "@/components/BookCover"

export const HomePage = () => {
  const { books, importJSON, exportJSON } = useLibraryStore((state) => state)

  const borderColors = [
    "border-l-yellow-400",
    "border-l-slate-500",
    "border-l-green-500",
    "border-l-red-600",
  ]

  const colorBorder = (book: Book) => {
    const status = book.status
    switch (status) {
      case "reading":
        return borderColors[0]
      case "backlog":
        return borderColors[1]
      case "completed":
        return borderColors[2]
      case "dropped":
        return borderColors[3]
      default:
        return borderColors[1]
    }
  }

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

      <h3 className="my-2 flex items-end gap-2 text-2xl font-semibold">
        Recent
      </h3>
      <div className="rounded-lg border bg-muted p-4">
        {books.length > 0 ? (
          books.slice(books.length - 5).reverse().map((book, index) => (
            <div className="pb-2">
              <Card
                key={index}
                className={`flex select-none flex-col items-center rounded-none rounded-l-md border-l-8 ${colorBorder(book)} pt-2 sm:flex-row sm:pb-2 sm:pl-2`}
              >
                <div className="w-1/3 justify-center pt-2 sm:w-1/12 sm:pb-2 sm:pl-2">
                  <BookCoverSmall cover={book.cover_link || book.cover_i} title={book.title} />
                </div>

                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {book.author_name ? book.author_name.join(", ") : "-"}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <div className="p-4">
            <p className="text-primary">No books yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
