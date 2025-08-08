'use client'

// actions
import verifyUser from "@/actions/user/verify-user";
// context
// react-query
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// types
import { useEffect, type ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const { push } = useRouter()

  // user verification
  const { error } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  useEffect(() => {
    if (error) {
      toast.error(error?.message || 'Usuário não identificado!')
      push('/login')
    }

  }, [error])

  return (
    <div className="size-full">
      {children}
    </div>
  )
}