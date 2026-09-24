import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const lineStyle = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Upright coding cabinet, open lower service door and a small screwdriver. */
export function ServicePrinterIcon({ size = 34, ...props }: IconProps) {
  return <svg viewBox="0 0 32 32" width={size} height={size} {...lineStyle} aria-hidden="true" focusable="false" {...props}>
    <path d="M5 27V4a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v24h-7" />
    <rect x="8" y="7" width="10" height="6" rx="1" />
    <path d="m5 16 10 3v10L5 26Zm14 1v6M25 25l3-8m-2-1 2 1 2-5-2-1Z" />
  </svg>;
}

/** A control PCB beside a slim printhead with its nozzle and cable inlet. */
export function PrinterPartsIcon({ size = 34, ...props }: IconProps) {
  return <svg viewBox="0 0 32 32" width={size} height={size} {...lineStyle} aria-hidden="true" focusable="false" {...props}>
    <rect x="3" y="5" width="14" height="22" rx="1" />
    <rect x="7" y="12" width="6" height="7" rx=".5" />
    <path d="M7 9v3m6-3v3m-6 7v3m6-3v3M23 11V7h5v4" />
    <rect x="22" y="11" width="7" height="14" rx="1" />
    <path d="M22 15h7m-5 10v3h3v-3" />
  </svg>;
}

/** Industrial CIJ cabinet with control display and a tethered printhead. */
export function IndustrialPrinterIcon({ size = 34, ...props }: IconProps) {
  return <svg viewBox="0 0 32 32" width={size} height={size} {...lineStyle} aria-hidden="true" focusable="false" {...props}>
    <rect x="3" y="3" width="19" height="25" rx="1" />
    <rect x="7" y="7" width="11" height="6" rx="1" />
    <path d="M3 17h19M7 28v2m11-2v2m4-19h2a4 4 0 0 1 4 4v5" />
    <rect x="26" y="20" width="4" height="7" rx="1" />
    <path d="M28 27v2" />
  </svg>;
}
