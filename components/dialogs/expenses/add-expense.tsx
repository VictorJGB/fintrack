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
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'

// actions
import createExpense from '@/actions/expenses/create-expense'

// utils
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// icons
import { CalendarIcon, Loader2, PlusCircle } from "lucide-react"

const formSchema = z.object({
  date: z.date({ required_error: "Data é obrigatório" }),
  company: z.string().min(2, { message: 'Minimo 2 caracteres' }),
  description: z.string(),
  recipient: z.string().optional(),
  installments: z.number().int().min(1, { message: 'No minimo 1 parcela' }).max(12, { 'message': 'Maximo 12 parcelas' }),
  installments_paid: z.number().int().max(12, { 'message': 'Maximo 12 parcelas' }),
  amount_per_installment: z.number().min(1, { message: 'No minimo 1 real por parcela' }),
  total_amount: z.number()
})

export default function AddExpenseDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: createExpense,
    mutationKey: ['expenses', 'add'],
    onSuccess: ({ message }) => {
      toast.success(message)
      toggleModalOpen()
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
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
      date: new Date(),
      company: '',
      description: '',
      recipient: 'Eu',
      installments: 1,
      installments_paid: 0,
      amount_per_installment: 1,
      total_amount: 1
    }
  })

  // observers for input change
  const $installments = form.watch('installments')
  const $amount_per_installment = form.watch('amount_per_installment')

  function toggleModalOpen() {
    setIsOpen(!isOpen)
  }

  const resetForm = () => {
    form.reset()
    setIsOpen(false)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const resBody = {
      ...values,
      date: new Date()
    }
    mutate(resBody)
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
          <DialogTitle>Adicionar despesa</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              {/* date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Data da despesa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormMessage />
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
                        placeholder={'Ex: Aluguel, Conta de água...'}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* recipient */}
              <FormField
                control={form.control}
                name='recipient'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Destinatário (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Digita aqui o destinatário...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        max={12}
                        required
                        {...field}
                        onChange={(event) => {
                          const value = event.target.value
                          field.onChange(Number(value))
                          form.setValue('total_amount', Number(value) * $amount_per_installment)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
                        max={12}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                          form.setValue('total_amount', Number(value) * $installments)
                        }}
                        InputElement={<Input type='text' min={1} required />}
                      />
                    </FormControl>
                    <FormMessage />
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
