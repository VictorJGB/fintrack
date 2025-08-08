'use client'

// actions
import verifyUser from "@/actions/user/verify-user";
// libs
import { useQuery } from "@tanstack/react-query";
// components
import { formatToBRL } from "@/utils/formatters";
import { SectionCard, SectionCardSkeleton } from "./card";

export default function SalaryCard() {
  // user verification
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  if (isLoading) return <SectionCardSkeleton />;

  if (user) {

    return (
      <SectionCard
        title={formatToBRL(user.salary)}
        subtitle="Renda fixa mensal"
        description="Verifique quanto recebe mensalmente"
      />
    );
  }

  if (error)
    return <p className="text-destructive">{JSON.stringify(error, null, 2)}</p>;
}