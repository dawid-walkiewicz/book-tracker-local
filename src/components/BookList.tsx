import { Book, useStore } from "@/store"

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDropable } from "./StrictModeDropable"

import { GiBookPile, GiBookshelf, GiBookmarklet } from "react-icons/gi"

import { AddBookDialog } from "./AddBookDrawer"
import { BookSearch } from "./BookSearch"
import { BookItem } from "./BookItem"

export const BookList = () => {
  const { books, reorderBooks } = useStore(
    (state) => state,
  )

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const listType = result.source.droppableId as Book["status"]

    if (startIndex === endIndex) return

    reorderBooks(listType, startIndex, endIndex)
  }

  const renderDraggableBookList = (listType: Book["status"]) => {
    const filteredBooks = books.filter((book) => book.status === listType)

    return (
      <StrictModeDropable droppableId={listType}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filteredBooks.map((book, index) => (
              <Draggable key={book.key} draggableId={book.key} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="my-2"
                  >
                    <div {...provided.dragHandleProps}>
                      <BookItem book={book} index={index} listType={listType} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDropable>
    )
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h2 className="mb-4 text-2xl font-bold">Reading List</h2>
        <div className="h-full">
          <AddBookDialog>
            <BookSearch />
          </AddBookDialog>
        </div>
      </div>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Currently Reading
        <GiBookmarklet className="size-7" />
      </h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="rounded-lg border bg-muted p-4">
          {books.filter((book) => book.status === "inProgress").length > 0 ? (
            renderDraggableBookList("inProgress")
          ) : (
            <div className="p-4">
              <p className="text-primary">A rolling stone gathers no moss.</p>
            </div>
          )}
        </div>
      </DragDropContext>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Plan to read
        <GiBookPile className="size-8" />
      </h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="rounded-lg border bg-muted p-4">
          {books.filter((book) => book.status === "backlog").length > 0 ? (
            renderDraggableBookList("backlog")
          ) : (
            <div className="p-4">
              <p className="text-primary">
                Look before, or you'll find yourself behind.
              </p>
            </div>
          )}
        </div>
      </DragDropContext>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold">
        Completed
        <GiBookshelf className="size-8 pb-0.5" />
      </h3>
      <div className="rounded-lg border bg-muted p-4">
        {books.filter((book) => book.status === "done").length > 0 ? (
          <>
            {books
              .filter((book) => book.status === "done")
              .map((book, index) => <BookItem book={book} index={index} listType="done" />)}
          </>
        ) : (
          <div className="p-4">
            <p className="text-primary">Well done is better than well said.</p>
          </div>
        )}
      </div>
    </div>
  )
}
