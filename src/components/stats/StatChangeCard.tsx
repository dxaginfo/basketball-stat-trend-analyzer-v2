import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react';

interface StatChangeCardProps {
  title: string;
  current: number;
  previous: number;
  unit?: string;
  description?: string;
}

export function StatChangeCard({ title, current, previous, unit = '', description }: StatChangeCardProps) {
  const percentChange = ((current - previous) / previous) * 100;
  const isPositive = percentChange > 0;
  const isNeutral = Math.abs(percentChange) < 0.5;
  
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <div className="flex items-center text-2xl font-bold">
          {current.toFixed(1)} {unit}
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      
      <div className={`
        flex flex-col items-end
        ${isPositive ? "text-green-500" : isNeutral ? "text-muted-foreground" : "text-red-500"}
      `}>
        <div className="flex items-center gap-1">
          {isNeutral ? (
            <ArrowRightIcon className="h-4 w-4" />
          ) : isPositive ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(percentChange).toFixed(1)}%</span>
        </div>
        <p className="text-xs">vs previous season</p>
      </div>
    </div>
  );
}