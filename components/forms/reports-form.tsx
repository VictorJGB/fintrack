'use client'

// components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// libs
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from "lucide-react";
// form
import getReports from "@/actions/reports/get-reports";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  report: z.enum(['expenses', 'incomes', 'summary']),
  initial_date: z.date().optional(),
  final_date: z.date({ required_error: "Data é obrigatório" }),
})

function downloadPDF(blob: Blob | undefined, filename: string | undefined) {
  if (!blob || !filename) return

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ReportsForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      report: 'expenses',
      initial_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      final_date: new Date()
    }
  })

  const { report, initial_date, final_date } = form.getValues()

  const { isLoading, refetch } = useQuery({
    queryKey: ['reports', report, initial_date, final_date],
    queryFn: () => getReports(report, initial_date ?? new Date(), final_date),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  async function onSubmit() {
    try {
      const { data } = await refetch()
      downloadPDF(data?.blob, data?.filename)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="rounded-2xl">
          <CardContent className="grid grid-cols-1 grid-rows-3 lg:grid-cols-4 lg:grid-rows-1 gap-4 lg:gap-6">
            {/* reports */}
            <FormField
              control={form.control}
              name="report"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Tipo de relatório</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um relatório" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="expenses">Total de despesas</SelectItem>
                        <SelectItem value="incomes">Total de recebimentos</SelectItem>
                        <SelectItem value="summary">Total de resumido</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* initial date */}
            <FormField
              control={form.control}
              disabled={report === 'summary'}
              name="initial_date"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Data inicial</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                    <PopoverContent className="w-full p-0" align="start">
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

            {/* final date */}
            <FormField
              control={form.control}
              name="final_date"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Data final</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                    <PopoverContent className="w-full p-0" align="start">
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
          </CardContent>
        </Card>

        <div className="w-full flex items-center justify-end mt-5">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <span>{isLoading ? 'Gerando relatório...' : 'Gerar relatório'}</span>
          </Button>
        </div>
      </form>
    </Form >
  )
}