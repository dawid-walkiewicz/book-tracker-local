import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export const SearchBar = ({
  query,
  setQuery,
  isLoading,
  searchWorks,
  setIsEditionsVisible,
  setEditionResults,
}: {
  query: string
  setQuery: (value: string) => void
  isLoading: boolean
  searchWorks: () => void
  setIsEditionsVisible: (value: boolean) => void
  setEditionResults: (value: any[]) => void
}) => {
  const navigate = useNavigate()

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditionsVisible(false)
      searchWorks()
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-3 sm:flex-row">
      <div className="relative w-full sm:max-w-xs">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Search for a book"
        />
      </div>

      <div className="inline-flex gap-3">
        <Button
          onClick={() => {
            setIsEditionsVisible(false)
            setEditionResults([])
            searchWorks()
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />{" "}
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>

        <Button onClick={() => navigate("/add")} disabled={isLoading}>
          Create
        </Button>
      </div>
    </div>
  )
}
