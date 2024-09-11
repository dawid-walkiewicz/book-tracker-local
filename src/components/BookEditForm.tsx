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
import { FloatingLabelInput } from "./ui/floating-label-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Book } from "@/libraryStore"

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
    .nullable(),
  number_of_pages: z.number().nullable(),
  status: z.enum(["reading", "backlog", "completed", "dropped"]),
})

export const BookEditForm = ({ book }: { book: Book | null }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book?.title || "",
      author_name: book?.author_name.join(", ") || "",
      publish_year: book?.publish_year || null,
      publishers: book?.publishers.join(", ") || "",
      format: book?.format || "",
      cover: null,
      number_of_pages: book?.number_of_pages || null,
      status: "backlog",
    },
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    values: z.infer<typeof formSchema>,
  ) => {
    console.log(values)
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
          <CardContent className="flex justify-evenly pb-4 pt-4">
            <div className="flex w-1/4 flex-col justify-center">
              <BookCoverFile file={coverFile} title="" />

              <FormField
                name="cover"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Cover"
                        onChange={handleCoverChange} // Zmiennik pliku
                      />
                    </FormControl>
                    <FormMessage /> {/* Wyświetl komunikat o błędzie */}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="pb-4 text-2xl font-semibold">Basic information</h3>
              <div className="flex w-full items-stretch gap-8 pb-4 pl-4">
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
              <div className="flex flex-col gap-4 pb-4 pl-4">
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

                <div className="flex justify-between">
                  <FormField
                    name="publish_year"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
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

                <div className="flex justify-between">
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
              </div>

              <h3 className="pb-4 text-xl font-semibold">Reading status</h3>

              <div className="pl-4">
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
            <Button variant="outline">Cancel</Button>
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
