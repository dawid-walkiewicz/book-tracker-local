import { useNavigate, useParams } from "react-router-dom"

import { useLibraryStore } from "@/libraryStore"

export const AddBookPage = () => {
  const { key } = useParams()
  const navigate = useNavigate()

  const { getBook } = useLibraryStore((state) => state)

  return (
    <div>
      <p>AddBookPage</p>
      <p>{key ? key : "Creating"}</p>
    </div>
  )
}
