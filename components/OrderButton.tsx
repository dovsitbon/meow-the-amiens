"use client";

/** Ouvre le panneau « Commander » du header (événement partagé), depuis n'importe quelle section. */
export function OrderButton({ label, className = "btn btn-ink" }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("meow:order"))}>
      <span className="pearl" aria-hidden="true" />
      {label}
    </button>
  );
}
