import { useState, type Dispatch, type SetStateAction } from 'react'
// icons
import { CheckCircle2, Info, Loader2, Pencil } from 'lucide-react'
// libs
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
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
// actions
import updateUser from '@/actions/user/update-user'
// utils
import { formatToBRL } from '@/utils/formatters'
// types
import type User from '@/interfaces/user'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  salary: z.number().min(1, 'Salário é obrigatório')
})

type Props = {
  user: User
  triggerClassname: string | undefined
  setIsParentOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserInfoDialog({ user, triggerClassname, setIsParentOpen }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso!')
      setIsEditing(false)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar usuário')
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? '',
      email: user.email ?? '',
      salary: user.salary ?? 0
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutate({ id: user._id, formData: values })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={triggerClassname}>
          Minhas informações
          <Info className='h-4 w-4 ml-auto' />
        </Button>
      </DialogTrigger>
      <Separator />
      <DialogContent className="sm:max-w-[425px]">

        <DialogHeader>
          <DialogTitle>Minhas informações</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-5 py-4"
            onSubmit={form.handleSubmit(onSubmit)}

          >

            {/* form */}
            <div className='grid w-full gap-4'>
              {/* name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-primary font-bold">Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        className='col-span-3'
                        placeholder={user.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              >
              </FormField>
              {/* email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-primary font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        className='col-span-3'
                        placeholder={user.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              >
              </FormField>
              <FormField
                control={form.control}
                name='salary'
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-primary font-bold">Salário</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        {...field}
                        value={field.value}
                        onChangeValue={(_, value) => {
                          field.onChange(value)
                        }}
                        InputElement={
                          <Input
                            disabled={!isEditing}
                            className='col-span-3'
                            placeholder={formatToBRL(user.salary)}
                            type='text'
                            min={1}
                            required
                          />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              >
              </FormField>
            </div>
            <div className='mt-4 flex items-center justify-end gap-2'>
              <DialogClose
                asChild
                onClick={() => { setIsEditing(false); setIsParentOpen(false) }}
              >
                <Button variant={'secondary'}>Fechar</Button>
              </DialogClose>
              {!isEditing && <Button onClick={() => setIsEditing(true)}>
                Editar
                <Pencil className='h-3 w-3 ml-2' />
              </Button>}
              {isEditing && <Button type='submit' disabled={isPending}>
                Salvar
                {!isPending && <CheckCircle2 className='h-3 w-3 ml-2' />}
                {isPending && <Loader2 className='h-3 w-3 ml-2 animate-spin' />}
              </Button>}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
