import { Book, useLibraryStore } from "@/libraryStore.ts"

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable } from "./StrictModeDroppable.tsx"

import { DragBookItem } from "@/components/bookLists/DragBookItem.tsx"

export const DraggableBookList = ({
  filteredBooks,
  listType,
  quote,
}: {
  filteredBooks: Book[]
  listType: Book["status"]
  quote: string
}) => {
  const { reorderBooks } = useLibraryStore((state) => state)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const listType = result.source.droppableId as Book["status"]

    if (startIndex === endIndex) return

    reorderBooks(listType, startIndex, endIndex)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="rounded-lg border bg-muted p-4">
        {filteredBooks.length > 0 ? (
          <StrictModeDroppable droppableId={listType}>
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
          </StrictModeDroppable>
        ) : (
          <div className="p-4">
            <p className="text-primary">{quote}</p>
          </div>
        )}
      </div>
    </DragDropContext>
  )
}
