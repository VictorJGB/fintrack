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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'

// actions
import updateExpense from '@/actions/expenses/update-expense'

// types
import type Expense from '@/interfaces/expense'

// icons
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader2, Pencil } from "lucide-react"
import { useState } from 'react'

const formSchema = z.object({
  company: z.string().min(2, { message: 'Minimo 2 caracteres' }),
  description: z.string(),
  recipient: z.string().min(2, { message: 'Minimo 2 caracteres' }).optional(),
  installments: z.number().int().min(1, { message: 'No minimo 1 parcela' }),
  installments_paid: z.number().int(),
  amount_per_installment: z.number().min(1, { message: 'No minimo 1 real por parcela' }),
  total_amount: z.number()
})


interface Props {
  data: Expense
}

export default function EditExpenseDialog({ data }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: updateExpense,
    mutationKey: ['update-expense'],
    onSuccess: ({ message }) => {
      toast.success(message)
      toggleModalOpen()
      queryClient.invalidateQueries({ queryKey: ['get-expenses'] })
    },
    onError: (err) => {
      console.error(err)
      toast.error(err.message)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: data.company,
      description: data.description,
      recipient: data.recipient,
      installments: data.installments,
      installments_paid: data.installments_paid,
      amount_per_installment: data.amount_per_installment,
      total_amount: data.total_amount
    }
  })

  // observers for input change
  const $installments = form.watch('installments')

  function toggleModalOpen() {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ id: data._id, formData: values })
  }

  function handleTotalAmount(amount: number | string) {
    if ($installments && amount) {
      const totalAmount = Number(amount) * $installments

      form.setValue('total_amount', totalAmount)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className='w-full'>
          Editar despesa
          <Pencil className="size-4 ml-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar despesa</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              {/* company */}
              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Digite a empresa'
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                        placeholder={data.description || 'Digita sua descrição aqui...'}
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* recipient */}
              <FormField
                control={form.control}
                name='recipient'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Destinatário</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Digita aqui o destinatário...'
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* installments */}
              <FormField
                control={form.control}
                name='installments'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Parcelas</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* installments_paid */}
              <FormField
                control={form.control}
                name='installments_paid'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Parcelas pagas</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* amount_per_installments */}
              <FormField
                control={form.control}
                name='amount_per_installment'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Valor por parcelas</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        {...field}
                        value={field.value}
                        onChangeValue={(_, value) => {
                          field.onChange(value)
                          handleTotalAmount(value)
                        }}
                        InputElement={<Input type='text' min={1} required />}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* total_amount */}
              <FormField
                control={form.control}
                name='total_amount'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Valor total</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        {...field}
                        onChangeValue={(_, value) => {
                          field.onChange(value)
                        }}
                        InputElement={<Input type='text' min={1} required disabled />}
                      />
                    </FormControl>
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
