import { useEffect } from "react"
import { useLibraryStore } from "./libraryStore"
import { Layout } from "./components/Layout"

import { TooltipProvider } from "@/components/ui/tooltip"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ReadingPage } from "./components/Pages/ReadingPage"
import { PlanToReadPage } from "./components/Pages/PlanToReadPage"
import { CompletedPage } from "./components/Pages/CompletedPage"
import { DroppedPage } from "./components/Pages/DroppedPage"
import { EditBookPage } from "./components/Pages/EditBookPage"
import { HomePage } from "@/components/Pages/HomePage"

export const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Reading", href: "/reading", current: false },
  { name: "Completed", href: "/completed", current: false },
  { name: "Plan to read", href: "/backlog", current: false },
  { name: "Dropped", href: "/dropped", current: false },
]

const App = () => {
  const { loadBooksFromLocalStorage, loadSeriesFromLocalStorage } = useLibraryStore((state) => state)

  useEffect(() => {
    loadBooksFromLocalStorage()
    loadSeriesFromLocalStorage()
  }, [loadBooksFromLocalStorage, loadSeriesFromLocalStorage])

  return (
    <Router>
      <Layout>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/backlog" element={<PlanToReadPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/dropped" element={<DroppedPage />} />
            <Route path="/add" element={<EditBookPage />} />
            <Route path="/edit/:key" element={<EditBookPage />} />
          </Routes>
        </TooltipProvider>
      </Layout>
    </Router>
  )
}

export default App
