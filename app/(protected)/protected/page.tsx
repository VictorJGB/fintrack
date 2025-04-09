'use client'

import verifyUser from '@/actions/user/verify-user'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function ProtectedPage() {
  const [isPending, startTransition] = useTransition()

  const handleCheck = async () => {
    startTransition(async () => {
      try {
        const data = await verifyUser()
        toast.success(JSON.stringify(data))
      } catch (e) {
        if (e instanceof Error) toast.error(e.message)
        console.log(e)
      }
    })
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Button type='submit' onClick={handleCheck} disabled={isPending}>
        Check user
      </Button>
    </div>
  )
}