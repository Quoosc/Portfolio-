import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';

export function ArchitectureDiagram({
  layers,
}: {
  layers: Array<{ name: string; description: string }>;
}) {
  return (
    <ol className="flex flex-col items-stretch gap-2 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-3">
      {layers.map((layer, index) => (
        <li key={layer.name} className="contents">
          <div className="rounded-xl border border-border bg-elevated p-4 sm:min-h-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
              Layer 0{index + 1}
            </p>
            <h4 className="mt-2 text-sm font-semibold text-text">{layer.name}</h4>
            <p className="mt-1 text-xs leading-5 text-muted">{layer.description}</p>
          </div>
          {index < layers.length - 1 && (
            <ArrowRightIcon
              size={16}
              aria-label="connects to"
              aria-hidden="true"
              className="mx-auto rotate-90 text-accent md:rotate-0"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
