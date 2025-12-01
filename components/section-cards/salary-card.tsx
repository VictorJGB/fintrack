'use client'

// actions
import verifyUser from "@/actions/user/verify-user";
// libs
import { useQuery } from "@tanstack/react-query";
// components
import { formatToBRL } from "@/utils/formatters";
import { SectionCard } from "./card";

export default function SalaryCard() {
  // user verification
  const { data: user, isLoading } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  return (
    <SectionCard
      title={formatToBRL(user?.salary ?? 0)}
      subtitle="Renda fixa mensal"
      description="Verifique quanto recebe mensalmente"
      isSuspense={isLoading}
    />
  );

}