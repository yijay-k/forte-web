/**
 * The absence is the product claim, so it gets its own section rather than a
 * footnote. Dashed border, no card fill — visually it reads as a boundary.
 */
export function NotMeasured({ items }: { items: readonly string[] }) {
  return (
    <div className="rounded-3xl border-hair border-dashed border-ink/35 px-7 py-6.5">
      <div className="mb-1.5 font-serif text-xl font-medium">
        What we deliberately don&rsquo;t measure
      </div>
      <p className="mb-4 text-[13.5px] leading-relaxed text-muted">
        Some of this is technically impossible for us. The rest we could fake, and
        won&rsquo;t — a number you know is invented would poison the four that
        aren&rsquo;t.
      </p>

      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.75 rounded-pill border border-ink/18 bg-[#F3F0E2] px-3.5 py-1.75 text-[12.5px] font-semibold text-muted"
          >
            <span className="h-[1.5px] w-2.25 bg-faint" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
