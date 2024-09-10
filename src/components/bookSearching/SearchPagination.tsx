import { useState } from "react"
import { Button } from "@/components/ui/button"

import { SlArrowRight, SlArrowLeft } from "react-icons/sl"

export const SearchPagination = ({ totalWorkResults, isLoading, searchWorks }: {totalWorkResults : number, isLoading : boolean, searchWorks : (page: number) => void}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 15

  const startIndex = (currentPage - 1) * resultsPerPage + 1
  const endIndex = Math.min(currentPage * resultsPerPage, totalWorkResults)

  const handlePrevoiusPage = () => {
    if (currentPage <= 1) return
    setCurrentPage(currentPage - 1)
    searchWorks(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage >= Math.ceil(totalWorkResults / resultsPerPage)) return
    setCurrentPage(currentPage + 1)
    searchWorks(currentPage + 1)
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 border-t px-6 py-4 sm:flex-row sm:justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalWorkResults > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {startIndex} - {endIndex}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {totalWorkResults}
              </span>{" "}
              results
            </>
          ) : (
            "0 results"
          )}
        </p>
      </div>
      <div className="inline-flex gap-x-2">
        <Button
          variant="outline"
          onClick={handlePrevoiusPage}
          disabled={currentPage <= 1 || isLoading}
        >
          <SlArrowLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={
            currentPage >= Math.ceil(totalWorkResults / resultsPerPage) ||
            isLoading
          }
        >
          <SlArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
