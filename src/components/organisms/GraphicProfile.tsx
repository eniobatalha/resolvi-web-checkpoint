
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Janeiro", preco: 186.80 },
  { month: "Fevereiro", preco: 305.20 },
  { month: "Março", preco: 237.20 },
  { month: "Abril", preco: 73.19 },
  { month: "Maio", preco: 209.13 },
  { month: "Junho", preco: 214.14 },
]

const chartConfig = {
  preco: {
    label: "Valor recebido",
    color: "#2563eb",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "#60a5fa",
  // },
} satisfies ChartConfig

export function GraphicProfile() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="preco" fill="var(--color-preco)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
