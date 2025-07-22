'use client'

import { useMemo, useState } from 'react'
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
import { toast } from 'sonner'
// icons
import { FileUp, Loader2 } from "lucide-react"
// forms
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// lib
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
// actions
import importIncomes from '@/actions/incomes/import-incomes'

const MAX_FILES = 1
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

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

export default function ImportIncomesDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationKey: ['import-incomes'],
    mutationFn: importIncomes,
    onSuccess: () => {
      toast.success("Recebimentos importados com sucesso!"),
        queryClient.invalidateQueries({ queryKey: ['get-incomes'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })

  // form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  })

  const isFilesUploaded = useMemo(() => {
    console.log(form.getValues("files"))
    return form.watch("files")?.length >= MAX_FILES
  }, [form.watch("files")])

  function resetForm() {
    form.reset()
    setIsOpen(false)
  }

  async function onSubmit(data: FormValues) {
    // Create FormData to send the file
    const formData = new FormData()
    formData.append('file', data.files[0])

    await mutate(formData)
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Importar
          <FileUp className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]" onInteractOutside={() => form.reset()}>
        <DialogHeader>
          <DialogTitle>Importar recebimento</DialogTitle>
          <DialogDescription>
            Importe seus recebimentos a partir de um arquivo Excel.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                      maxSize={MAX_SIZE}
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
              <Button type="submit" disabled={!isFilesUploaded || isPending}>
                Importar arquivo
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}

