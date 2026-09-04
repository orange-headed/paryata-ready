import { cn } from '@/lib/utils'
import type { CrowdLevel } from '@/lib/types'
import { Gem, HandHeart, Leaf, Sparkles, Users } from 'lucide-react'

export function HiddenGemBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm',
        className,
      )}
    >
      <Gem className="size-3" />
      Hidden gem
    </span>
  )
}

export function CrowdBadge({
  level,
  className,
}: {
  level: CrowdLevel
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2.5 py-1 text-[0.68rem] font-semibold text-leaf',
        className,
      )}
    >
      <Users className="size-3" />
      {level} crowd
    </span>
  )
}

export function ImpactChip({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-leaf/12 px-3 py-1.5 text-[0.72rem] font-medium text-leaf',
        className,
      )}
    >
      <Leaf className="size-3.5 shrink-0" />
      {label}
    </span>
  )
}

export function TagPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">
      {label}
    </span>
  )
}

const featureIcon = {
  'Local Experience': Sparkles,
  'Support Local': HandHeart,
  'Low Crowd': Users,
} as const

export function FeatureChip({
  label,
}: {
  label: keyof typeof featureIcon
}) {
  const Icon = featureIcon[label]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[0.72rem] font-semibold text-accent-foreground">
      <Icon className="size-3.5" />
      {label}
    </span>
  )
}
