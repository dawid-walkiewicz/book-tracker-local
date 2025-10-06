import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Work } from "@/libraryStore"

import { BookCoverSmall } from "@/components/BookCover"

import { IoMdMore } from "react-icons/io"

export const SearchResults = ({
  query,
  wasSearched,
  workResults,
  setIsEditionsVisible,
  searchEditions,
}: {
  query: string
  wasSearched: boolean
  workResults: Work[]
  setIsEditionsVisible: (value: boolean) => void
  searchEditions: (editions: string[], author: string[]) => void
}) => {
  return (
    <div className="block max-h-[200px] overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
      {query.length > 0 && workResults.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden sm:table-cell">Year</TableHead>{" "}
              {/* hide cell when screen is small */}
              <TableHead className="hidden sm:table-cell">Page Count</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {workResults.map((work, index) => (
              <TableRow key={index}>
                <TableCell className="mr-0 p-2">
                  <div className="w-12 sm:w-16">
                    <BookCoverSmall cover={work.cover_i} title={work.title} />
                  </div>
                  
                </TableCell>
                <TableCell className="pl-0">{work.title}</TableCell>
                <TableCell>
                  {work.author_name ? work.author_name.join(", ") : ""}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {work.first_publish_year}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {work.number_of_pages_median || "-"}
                </TableCell>
                <TableCell>
                  <Button
                    className="hidden sm:inline"
                    variant="secondary"
                    disabled={work.editions.length === 0}
                    onClick={() => {
                      searchEditions(work.editions, work.author_name)
                      setIsEditionsVisible(true)

                      console.log(work)
                    }}
                  >
                    Editions
                  </Button>
                  <IoMdMore
                    className="inline size-6 sm:hidden cursor-pointer"
                    aria-hidden="true"
                    onClick={() => {
                      searchEditions(work.editions, work.author_name)
                      setIsEditionsVisible(true)

                      console.log(work)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex max-h-60 items-center justify-center p-16">
          <p className="text-gray-600 dark:text-gray-400">
            {wasSearched ? "Nothing found :(" : "Start your search!"}
          </p>
        </div>
      )}
    </div>
  )
}
