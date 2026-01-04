import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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
import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  time: {
    label: "Time (s)",
  },
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-2))",
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--chart-5))",
  },
  warning: {
    label: "Correct (Slow)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ResponseTimeChart({ data, isLoading }: { data: any[], isLoading: boolean }) {
  if (isLoading) {
    return (
        <Card className="border-slate-700/80 shadow-none bg-slate-800/50 p-4 rounded-lg h-[342px]">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-[250px] w-full" />
        </Card>
    );
  }

  return (
    <Card className="border-slate-700/80 shadow-none bg-slate-800/50 p-4 rounded-lg">
      <CardHeader className="p-0 pb-4">
        <CardTitle>Question Response Time</CardTitle>
        <CardDescription>
          Time spent on each question.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="question" tickLine={false} axisLine={false} tickMargin={10} stroke="#a1a1aa" fontSize={12} />
            <YAxis
                tickFormatter={(value) => `${Math.floor(Number(value) / 60)}m`}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 'dataMax + 60']}
                stroke="#a1a1aa"
                fontSize={12}
            />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                    formatter={(value, name, item) => {
                        if (name === 'time' && item.payload) {
                            const { status } = item.payload;
                            const statusConfigKey = status as keyof typeof chartConfig;
                            const statusConfig = chartConfig[statusConfigKey] as { label: string, color: string };
                            return (
                                <div className="w-full">
                                    <div className="flex items-center gap-2">
                                         <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: statusConfig?.color}} />
                                         <span className="font-bold capitalize text-foreground">{statusConfig.label}</span>
                                    </div>
                                    <div className="mt-1 ml-4 text-sm">
                                        Response time: <span className="font-mono font-bold">{`${Math.floor(value as number / 60)}m ${value as number % 60}s`}</span>
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    }}
                    hideLabel
                />}
            />
            <Bar dataKey="time" radius={4}>
                {data.map((entry, index) => {
                    const statusKey = entry.status as keyof typeof chartConfig;
                    const color = (chartConfig[statusKey] as {color: string})?.color;
                    return <Cell key={`cell-${index}`} fill={color} />;
                })}
            </Bar>
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
