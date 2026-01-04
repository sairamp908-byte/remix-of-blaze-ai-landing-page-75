
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface PerformanceChartProps {
  data: {
    topic: string;
    performance: number;
  }[];
}

const chartConfig = {
  performance: {
    label: "Performance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PerformanceChart({ data }: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Not enough data to display chart.
      </div>
    );
  }
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="p-0 pb-4">
        <CardTitle>Topic Mastery</CardTitle>
        <CardDescription>
          Your performance percentage in each topic.
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: -20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="topic"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => {
              const words = value.split(" ");
              if (words.length > 2) {
                return words.slice(0, 2).join(" ") + "…";
              }
              return value;
            }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[0, 100]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" hideLabel />}
          />
          <Bar
            dataKey="performance"
            fill="var(--color-performance)"
            radius={5}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
