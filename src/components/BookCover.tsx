import { useState, useEffect } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import NotFoundImage from "@/assets/image-not-found-icon.png"

export const BookCoverSmall = ({
  cover,
  title,
}: {
  cover: number | string | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState<string>(NotFoundImage)

  useEffect(() => {
    if (!cover) {
      setImgSrc(NotFoundImage)
      return
    }
    if (typeof cover === "number") {
      setImgSrc(`https://covers.openlibrary.org/b/id/${cover}-L.jpg`)
      return
    }
    if (typeof cover === "string") {
      if (cover.startsWith("http://") || cover.startsWith("https://")) {
        setImgSrc(cover)
        return
      }
      if (cover.startsWith("data:image/")) {
        setImgSrc(cover)
        return
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.electronAPI.readFileAsBase64(cover).then((base64: string | null) => {
        setImgSrc(base64 || NotFoundImage)
      })
      return
    }
    setImgSrc(NotFoundImage)
  }, [cover])

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {" "}
          <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-gray-900" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={`Cover of ${title}`}
        className={`h-full w-full object-cover ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export const BookCoverMedium = ({
  cover,
  title,
}: {
  cover: number | string | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState<string>(NotFoundImage)

  useEffect(() => {
    if (!cover) {
      setImgSrc(NotFoundImage)
      return
    }
    if (typeof cover === "number") {
      setImgSrc(`https://covers.openlibrary.org/b/id/${cover}-L.jpg`)
      return
    }
    if (typeof cover === "string") {
      if (cover.startsWith("http://") || cover.startsWith("https://")) {
        setImgSrc(cover)
        return
      }
      if (cover.startsWith("data:image/")) {
        setImgSrc(cover)
        return
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.electronAPI.readFileAsBase64(cover).then((base64: string | null) => {
        setImgSrc(base64 || NotFoundImage)
      })
      return
    }
    setImgSrc(NotFoundImage)
  }, [cover])

  return (
    <div className="h-36 w-24">
      {loading && (
        <div className="inset-0 flex items-center justify-center bg-gray-100">
          <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-gray-900" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={`Cover of ${title}`}
        className={`h-full w-full object-cover ${loading ? "hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export const BookCoverLarge = ({
  cover,
  title,
}: {
  cover: number | string | null
  title: string
}) => {
  const [loading, setLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState<string>(NotFoundImage)

  useEffect(() => {
    if (!cover) {
      setImgSrc(NotFoundImage)
      return
    }
    if (typeof cover === "number") {
      setImgSrc(`https://covers.openlibrary.org/b/id/${cover}-L.jpg`)
      return
    }
    if (typeof cover === "string") {
      if (cover.startsWith("http://") || cover.startsWith("https://")) {
        setImgSrc(cover)
        return
      }
      if (cover.startsWith("data:image/")) {
        setImgSrc(cover)
        return
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.electronAPI.readFileAsBase64(cover).then((base64: string | null) => {
        setImgSrc(base64 || NotFoundImage)
      })
      return
    }
    setImgSrc(NotFoundImage)
  }, [cover])

  return (
    <div className="relative">
      {loading && (
        <div className="inset-0 flex items-center justify-center">
          <AiOutlineLoading3Quarters className="size-16 animate-spin text-gray-900" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={`Cover of ${title}`}
        className={`mx-auto h-full w-1/2 rounded-lg object-cover ${cover ? "" : "dark:invert"} sm:h-full sm:w-full sm:rounded-l-lg ${loading ? "hidden" : ""}`}
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
