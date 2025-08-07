import { useState } from 'react'

// libs
import { queryClient } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CurrencyInput } from 'react-currency-mask'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'

// actions

// utils

// icons
import createFixedExpense from '@/actions/fixed-expenses/create-fixed-expense'
import { Loader2, PlusCircle } from "lucide-react"

const formSchema = z.object({
  description: z.string().min(2, { message: 'Minimo 2 caracteres' }),
  amount: z.number().min(1, { message: 'No minimo 1 real' }),
})

export default function AddFixedExpenseDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: createFixedExpense,
    mutationKey: ['create-fixed-expense'],
    onSuccess: ({ message }) => {
      toast.success(message)
      toggleModalOpen()
      queryClient.invalidateQueries({ queryKey: ['fixed'] })
      resetForm()
    },
    onError: (err) => {
      console.error(err)
      toast.error(err.message)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 1
    }
  })


  function toggleModalOpen() {
    setIsOpen(!isOpen)
  }

  const resetForm = () => {
    form.reset()
    setIsOpen(false)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Adicionar
          <PlusCircle className="size-4 ml-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => resetForm()}>
        <DialogHeader>
          <DialogTitle>Adicionar despesa fixa</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              {/* description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder={'Ex: Aluguel, Conta de água...'}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* amount */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        {...field}
                        onChangeValue={(_, value) => {
                          field.onChange(value)
                        }}
                        InputElement={<Input type='text' min={1} required />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* footer */}
            <div className='w-full flex items-center justify-end gap-4 mt-5'>
              <DialogClose asChild>
                <Button variant='ghost'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className='size-4 mr-4 animate-spin' />}
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
