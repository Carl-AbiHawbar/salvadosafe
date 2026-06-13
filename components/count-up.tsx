"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function parseStatValue(value: string) {
  if (value.startsWith("#")) {
    return { prefix: "#", target: parseInt(value.slice(1), 10) || 1, suffix: "" };
  }
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value };
  return { prefix: "", target: parseInt(match[1].replace(/,/g, ""), 10), suffix: match[2] || "" };
}

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() =>
    parsed.prefix ? `${parsed.prefix}0` : `0${parsed.suffix}`
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();

        const { prefix, target, suffix } = parsed;
        const duration = 1600;
        const start = performance.now();

        function frame(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
          if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [parsed]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
