import { create } from "zustand"

export type Book = {
  key: string
  title: string
  author_name: string[]
  first_publish_year: number
  number_of_pages_median: number | null
  status: "done" | "inProgress" | "backlog"
}

interface BookState {
  books: Book[]
}

interface BookStore extends BookState {
  addBook: (book: Book) => void
  removeBook: (book: Book) => void
  moveBook: (book: Book, newStatus: Book["status"]) => void
  loadBooksFromLocalStorage: () => void
  reorderBooks: (
    listType: Book["status"],
    startIndex: number,
    endIndex: number,
  ) => void
}

export const useStore = create<BookStore>((set) => ({
  books: [],

  addBook: (book) =>
    set((state: BookState) => {
      const updatedBooks: Book[] = [
        ...state.books,
        {
          key: book.key,
          title: book.title,
          author_name: book.author_name,
          first_publish_year: book.first_publish_year,
          number_of_pages_median: book.number_of_pages_median,
          status: book.status || "backlog",
        },
      ]

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  removeBook: (bookToRemove) =>
    set((state: BookState) => {
      if (!window.confirm("Are you sure you want to remove this book?"))
        return state

      const updatedBooks = state.books.filter(
        (book) => book.key !== bookToRemove.key,
      )

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  moveBook: (bookToMove, newStatus) =>
    set((state: BookState) => {
      const updatedBooks = state.books.map((book) =>
        book.key === bookToMove.key ? { ...book, status: newStatus } : book,
      )

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  reorderBooks: (
    listType: Book["status"],
    startIndex: number,
    endIndex: number,
  ) =>
    set((state: BookState) => {
      const filteredBooks = state.books.filter(
        (book) => book.status === listType,
      )

      const [removed] = filteredBooks.splice(startIndex, 1)
      filteredBooks.splice(endIndex, 0, removed)

      const updatedBooks = state.books.map((book) =>
        book.status === listType ? filteredBooks.shift() || book : book,
      )

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  loadBooksFromLocalStorage: () => {
    const savedBooks = localStorage.getItem("readingList")

    if (savedBooks) {
      set({ books: JSON.parse(savedBooks) })
    } else {
      set({ books: [] })
    }
  },
}))
