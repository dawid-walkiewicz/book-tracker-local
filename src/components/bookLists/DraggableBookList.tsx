import { Book, useLibraryStore } from "@/libraryStore.ts"

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDropable } from "./StrictModeDropable.tsx"

import { DragBookItem } from "@/components/bookLists/DragBookItem.tsx"

export const DraggableBookList = ({
  listType,
  quote,
}: {
  listType: Book["status"]
  quote: string
}) => {
  const { books, reorderBooks } = useLibraryStore((state) => state)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const listType = result.source.droppableId as Book["status"]

    if (startIndex === endIndex) return

    reorderBooks(listType, startIndex, endIndex)
  }

  const filteredBooks = books.filter((book) => book.status === listType)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="rounded-lg border bg-muted p-4">
        {books.filter((book) => book.status === listType).length > 0 ? (
          <StrictModeDropable droppableId={listType}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredBooks.map((book, index) => (
                  <Draggable
                    key={book.key}
                    draggableId={book.key}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="my-2"
                      >
                        <div {...provided.dragHandleProps}>
                          <DragBookItem
                            book={book}
                            index={index}
                            listType={listType}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDropable>
        ) : (
          <div className="p-4">
            <p className="text-primary">{quote}</p>
          </div>
        )}
      </div>
    </DragDropContext>
  )
}
