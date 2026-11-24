export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-muted">
      <span className="text-accent">Sec. {index}</span>
      <span className="hairline h-px flex-1" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
