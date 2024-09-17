import { BookCoverFile } from "@/components/BookCover"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Book, useLibraryStore } from "@/libraryStore"

import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import {
  ComboboxWithCreate,
} from "@/components/ui/combobox-create.tsx"

const currentYear = new Date().getFullYear()

const formSchema = z.object({
  title: z
    .string({ required_error: "You must write a title" })
    .min(2, { message: "Title is too short!" }),
  author_name: z.string().min(2, { message: "Author name is too short!" }),
  publish_year: z
    .number()
    .max(currentYear + 25, { message: "You are not a time traveller" })
    .nullable(),
  publishers: z.string().nullable(),
  format: z.string().nullable(),
  cover: z
    .instanceof(File)
    .refine(
      (file) =>
        file === null || ["image/jpeg", "image/png"].includes(file.type),
      { message: "The cover must be a valid image file (jpeg, png)." },
    )
    .optional()
    .nullable(),
  number_of_pages: z.number().nullable(),
  series: z.string().nullable(),
  series_position: z
    .number()
    .positive("Must be > 0")
    .multipleOf(0.1, "Only 1 decimal place")
    .nullable(),
  status: z.enum(["reading", "backlog", "completed", "dropped"]),
})

export const BookEditForm = ({
  book,
  doOnSubmit,
}: {
  book: Book | null
  doOnSubmit: (book: Book) => void
}) => {
  const navigate = useNavigate()

  const { series, addSeries } = useLibraryStore((state) => state)

  const initialValues = {
    title: book?.title || "",
    author_name: book?.author_name ? book.author_name.join(", ") : "",
    publish_year: book?.publish_year || null,
    publishers: book?.publishers?.join(", ") || "",
    format: book?.format || "",
    cover: null,
    number_of_pages: book?.number_of_pages || null,
    series: book?.series || "",
    series_position: book?.series_position || null,
    status: book?.status || "backlog",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onChange",
  })

  useEffect(() => {
    if (book) {
      form.trigger()
    }
    // eslint-disable-next-line
  }, [book])

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    values: z.infer<typeof formSchema>,
  ) => {
    console.log(values)

    let editedBook: Book

    if (book === null) {
      editedBook = {
        key: "123",
        title: values.title,
        author_name: values.author_name.split(", "),
        publish_year: values.publish_year,
        publishers: values.publishers ? values.publishers.split(", ") : [],
        format: values.format,
        cover_i: null,
        number_of_pages: values.number_of_pages,
        series: values.series,
        series_position: values.series_position,
        status: values.status,
      }
    } else {
      editedBook = {
        key: book.key,
        title: values.title,
        author_name: values.author_name.split(", "),
        publish_year: values.publish_year,
        publishers: values.publishers ? values.publishers.split(", ") : [],
        format: values.format,
        cover_i: book.cover_i,
        number_of_pages: values.number_of_pages,
        series: values.series,
        series_position: values.series_position,
        status: values.status,
      }
    }

    doOnSubmit(editedBook)

    navigate(`/${editedBook.status}`)
  }

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    form.setValue("cover", file)
    form.trigger("cover")
  }

  const coverFile = form.watch("cover")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full divide-y divide-muted">
          <CardContent className="flex flex-col pb-4 pt-4 sm:flex-row sm:justify-evenly">
            <div className="flex flex-col items-center justify-center pb-4 sm:w-1/4 sm:pb-0">
              <BookCoverFile file={coverFile || null} title="" />

              <FormField
                name="cover"
                control={form.control}
                render={() => (
                  <FormItem className="w-3/4 pt-2 sm:w-fit">
                    <FormControl>
                      <Input
                        className="dark:file:text-foreground"
                        type="file"
                        placeholder="Cover"
                        onChange={handleCoverChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="pb-4 text-2xl font-semibold">Basic information</h3>
              <div className="flex flex-col items-stretch gap-4 pb-4 sm:flex-row sm:gap-8 sm:pl-4">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput label="Book title" {...field} />
                      </FormControl>
                      <FormMessage className="mt-1 pl-2 pr-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="author_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput label="Book author(s)" {...field} />
                      </FormControl>
                      <FormMessage className="mt-1 pl-2 pr-2" />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="pb-4 text-xl font-semibold">
                Additional information (Optional)
              </h3>
              <div className="flex flex-col gap-4 pb-4 sm:pl-4">
                <FormField
                  name="publishers"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          type="string"
                          label="Publisher(s)"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="sm:flex sm:justify-between sm:gap-8">
                  <FormField
                    name="series"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-grow pb-2 sm:pb-0">
                        <FormControl>
                          {/*<FloatingLabelInput*/}
                          {/*  type="string"*/}
                          {/*  label="Series"*/}
                          {/*  {...field}*/}
                          {/*  value={field.value || ""}*/}
                          {/*/>*/}
                          <ComboboxWithCreate
                            mode="single"
                            options={series.map((s) => ({
                              label: s.name,
                              value: s.key,
                            }))}
                            placeholder="Series..."
                            selected={field.value || ""}
                            onChange={(value) =>
                              form.setValue(
                                "series",
                                typeof value === "string" ? value : value[0],
                              )
                            }
                            onCreate={(value) => {
                              if (value && !series.find((s) => s.name === value)) {
                                addSeries({ key: series.length.toString(), name: value })
                              }
                              console.log(value)
                              form.setValue("series", value)
                            }}
                          />

                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="series_position"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormControl>
                          <FloatingLabelInput
                            type="number"
                            label="Volume"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || null)
                            }
                          />
                        </FormControl>
                        <FormMessage className="mt-1 pl-2 pr-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:flex sm:justify-between">
                  <FormField
                    name="publish_year"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="pb-4 sm:pb-0">
                        <FormControl>
                          <FloatingLabelInput
                            type="number"
                            label="Publishing year"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value, 10) || null,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage className="mt-1 pl-2 pr-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="number_of_pages"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            type="number"
                            label="Number of pages"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value, 10) || null,
                              )
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="format"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="max-w-fit">
                      <FormControl>
                        <FloatingLabelInput
                          type="string"
                          label="Format"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="pb-4 text-xl font-semibold">Reading status</h3>

              <div className="sm:pl-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="max-w-48">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Reading status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reading">Reading</SelectItem>
                          <SelectItem value="backlog">Plan to read</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="dropped">Dropped</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-6 pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will loose all the changes made to the book.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction onClick={() => navigate(-1)}>
                    Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              type="button"
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
