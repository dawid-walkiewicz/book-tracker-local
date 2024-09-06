import { useEffect } from "react"
import { BookList } from "./components/BookList"
import { useStore } from "./store"
import { Layout } from "./components/Layout"

import { TooltipProvider } from "@/components/ui/tooltip"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ReadingPage } from "./components/Pages/ReadingPage"
import { PlanToReadPage } from "./components/Pages/PlanToReadPage"
import { CompletedPage } from "./components/Pages/CompletedPage"
import { DroppedPage } from "./components/Pages/DroppedPage"

export const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Reading", href: "/reading", current: false },
  { name: "Completed", href: "/completed", current: false },
  { name: "Plan to read", href: "/backlog", current: false },
  { name: "Droped", href: "/dropped", current: false },
]

const App = () => {
  const { loadBooksFromLocalStorage } = useStore((state) => state)

  useEffect(() => {
    loadBooksFromLocalStorage()
  }, [loadBooksFromLocalStorage])

  return (
    <Router>
      <Layout>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/backlog" element={<PlanToReadPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/dropped" element={<DroppedPage />} />
          </Routes>
        </TooltipProvider>
      </Layout>
    </Router>
  )
}

export default App
