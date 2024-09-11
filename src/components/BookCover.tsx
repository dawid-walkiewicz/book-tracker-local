import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import NotFoundImage from "@/assets/image-not-found-icon.png"

export const BookCoverMedium = ({
  coverId,
  title,
}: {
  coverId: number | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative w-12 sm:w-16">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {" "}
          <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-gray-900" />
        </div>
      )}
      <img
        src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : NotFoundImage}
        alt={`Cover of ${title}`}
        className={`h-full w-full object-cover ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export const BookCoverLarge = ({
  coverId,
  title,
}: {
  coverId: number | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative">
      {loading && (
        <div className="inset-0 flex items-center justify-center">
        {" "}
        <AiOutlineLoading3Quarters className="size-16 animate-spin text-gray-900" />
      </div>
      )}
      <img
        src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : NotFoundImage}
        alt={`Cover of ${title}`}
        className={`mx-auto h-full w-1/2 rounded-lg object-cover ${coverId ? "" : "dark:invert"} sm:h-full sm:w-full sm:rounded-l-lg ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export const BookCoverFile = ({
  file: file,
  title,
}: {
  file: File | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative">
      {loading && (
        <div className="inset-0 flex items-center justify-center">
        {" "}
        <AiOutlineLoading3Quarters className="size-16 animate-spin text-gray-900" />
      </div>
      )}
      <img
        src={file ? URL.createObjectURL(file) : NotFoundImage}
        alt={`Cover of ${title}`}
        className={`mx-auto h-full w-1/2 rounded-lg object-cover ${file ? "" : "dark:invert"} sm:h-full sm:w-full sm:rounded-l-lg ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
