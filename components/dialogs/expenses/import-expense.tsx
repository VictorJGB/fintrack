'use client'

import { useMemo } from 'react'
// components
import FileUploader from '@/components/file-uploader'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// icons
import { FileUp } from "lucide-react"
// forms
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  files: z.array(z.instanceof(File))
    .min(1, "Selecione pelo menos um arquivo")
    .max(1, "Máximo de 1 arquivo permitido")
    .refine((files) => files.every((file) => file.size <= 2 * 1024 * 1024), {
      message: "Arquivo deve ser menor que 2MB",
      path: ["files"],
    }),
})

interface FormValues extends z.infer<typeof formSchema> { }

export default function ImportExpenseDialog() {
  const MAX_FILES = 1


  // form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  })

  const isFilesUploaded = useMemo(() => {
    console.log(form.getValues("files"))
    return form.watch("files")?.length > 0
  }, [])

  function onSubmit(data: FormValues) {
    console.log("Form submitted with data:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Importar
          <FileUp className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]" onInteractOutside={() => form.reset()}>
        <DialogHeader>
          <DialogTitle>Importar despesa</DialogTitle>
          <DialogDescription>
            Importe suas despesas a partir de um arquivo ou Excel.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <FileUploader
                      formValue={field.value}
                      onFormValueChange={field.onChange}
                      maxFiles={MAX_FILES}
                      disabled={isFilesUploaded}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild onClick={() => form.reset()}>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              <Button type="submit" disabled={!isFilesUploaded}>Importar arquivo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
