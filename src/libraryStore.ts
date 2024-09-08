import { create } from "zustand"

export type Book = {
  key: string
  title: string
  author_name: string[]
  first_publish_year: number
  number_of_pages_median: number | null
  cover_i?: number
  status: "completed" | "reading" | "backlog" | "dropped"
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
  getBook: (key: string) => Book
}

export const useLibraryStore = create<BookStore>((set) => ({
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
          cover_i: book.cover_i,
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

  getBook: (key) => {
    const savedBooks = localStorage.getItem("readingList")
    const books = savedBooks ? JSON.parse(savedBooks) : []

    books.find((book: Book) => book.key === key) ? books.find((book: Book) => book.key === key) : { key: "", title: "", author_name: [], first_publish_year: 0, number_of_pages_median: 0, status: "backlog" }

    return books.find((book: Book) => book.key === key)
  },
}))
