import { create } from "zustand"

export type Work = {
  key: string
  title: string
  author_name: string[]
  first_publish_year: number
  number_of_pages_median: number
  cover_i: number | null
  editions: string[]
  status: "completed" | "reading" | "backlog" | "dropped"
}

export type Book = {
  key: string
  title: string
  author_name: string[]
  publish_year: number | null
  publishers: string[] | null
  format: string | null
  cover_i: number | null
  number_of_pages: number | null
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
  getBook: (key: string) => Book | null
  editBook: (book: Book) => void
}

export const useLibraryStore = create<BookStore>((set) => ({
  books: [],

  addBook: (book) =>
    set((state: BookState) => {
      const updatedBooks = [
        ...state.books,
        {
          key: book.key,
          title: book.title,
          author_name: book.author_name,
          publish_year: book.publish_year,
          publishers: book.publishers,
          format: book.format,
          cover_i: book.cover_i,
          number_of_pages: book.number_of_pages,
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

  getBook: (key: string) => {
    const savedBooks = localStorage.getItem("readingList");
    const books: Book[] = savedBooks ? JSON.parse(savedBooks) : [];
  
    const foundBook = books.find((book: Book) => book.key === `/books/${key}`);
  
    return (
      foundBook || null
    );
  },

  editBook: (book) =>
    set((state: BookState) => {
      const updatedBooks = state.books.map((b) =>
        b.key === book.key ? book : b,
      )

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),
}))
