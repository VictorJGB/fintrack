'use client'

// actions
import getUser from "@/actions/user/get-user";
import verifyUser from "@/actions/user/verify-user";
// context
import { useUser } from "@/context/user";
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
  const { setUser } = useUser()
  const { push } = useRouter()

  // user verification
  const { data: authData, error: authError, isLoading } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  // Retrieving user data
  const { data: user } = useQuery({
    queryKey: ['user', authData?.userID],
    queryFn: () => getUser(authData?.userID || ''),
    enabled: !!authData?.userID,
  })


  useEffect(() => {
    if (authError && !isLoading) {
      toast.error(authError?.message || 'Usuário não identificado!')
      setUser(null)
      push('/login')
    }

    if (user) {
      setUser(user)
    }

  }, [authError, user])

  return (
    <div className="size-full">
      {children}
    </div>
  )
}