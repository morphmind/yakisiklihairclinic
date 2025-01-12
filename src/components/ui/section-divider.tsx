import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string;
  pattern?: 'dots' | 'lines' | 'waves';
}

export function SectionDivider({ className, pattern = 'dots' }: SectionDividerProps) {
  const patterns = {
    dots: "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z",
    lines: "M3 12h18M3 6h18M3 18h18",
    waves: "M0 20c5 0 5 -16 10 -16s5 16 10 16 5 -16 10 -16 5 16 10 16v-20h-40z",
  };

  return (
    <div className={cn("relative h-24 overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-muted-foreground/20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={patterns[pattern]} />
        </svg>
      </div>
    </div>
  );
}