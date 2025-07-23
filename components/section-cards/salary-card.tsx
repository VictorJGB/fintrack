'use client'

// actions
import getUser from "@/actions/user/get-user";
import verifyUser from "@/actions/user/verify-user";
// libs
import { useQuery } from "@tanstack/react-query";
// components
import { formatToBRL } from "@/utils/formatters";
import { SectionCard, SectionCardSkeleton } from "./card";

export default function SalaryCard() {
  // user verification
  const { data: authData, isLoading: isAuthenticating, error: AuthError } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  // Retrieving user data
  const { data: user, isLoading: isLoading, error: userError } = useQuery({
    queryKey: ['user', authData?.userID],
    queryFn: () => getUser(authData?.userID || ''),
    enabled: !!authData?.userID
  })

  if (isLoading || isAuthenticating) return <SectionCardSkeleton />;

  if (user) {

    return (
      <SectionCard
        title={formatToBRL(user.salary)}
        subtitle="Renda fixa mensal"
        description="Verifique quanto recebe mensalmente"
      />
    );
  }

  if (userError || AuthError)
    return <p className="text-destructive">{JSON.stringify(userError ?? AuthError, null, 2)}</p>;
}