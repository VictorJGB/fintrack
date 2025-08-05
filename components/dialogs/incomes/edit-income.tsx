import { useState } from 'react'
// libs
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'

// actions
import updateIncome from '@/actions/incomes/update-income'

// types
import type Income from '@/interfaces/income'

// icons
import { CalendarIcon, Loader2, Pencil } from "lucide-react"


const formSchema = z.object({
  date: z.date({
    required_error: 'Data obrigatória'
  }),
  source: z.string().min(2, { message: 'Minimo 2 caracteres' }),
  amount: z.number().min(1, { message: 'Mínimo R$1 reais' }),
})


interface Props {
  data: Income
}

export default function EditIncomeDialog({ data }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: updateIncome,
    mutationKey: ['update-expense'],
    onSuccess: ({ message }) => {
      toast.success(message)
      toggleModalOpen()
      queryClient.invalidateQueries({ queryKey: ['get-incomes', 'chart-incomes', 'card-incomes'] })
    },
    onError: (err) => {
      console.error(err)
      toast.error(err.message)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(data.date),
      source: data.source,
      amount: data.amount,
    }
  })


  function toggleModalOpen() {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ id: data._id, formData: values })
  }


  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className='w-full'>
          Editar recebimento
          <Pencil className="size-4 ml-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar recebimento</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              {/* date */}
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Data do recebimento</FormLabel>
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
              {/* source */}
              <FormField
                control={form.control}
                name='source'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Fonte</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Ex: Renda extra'
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
                        value={field.value}
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
