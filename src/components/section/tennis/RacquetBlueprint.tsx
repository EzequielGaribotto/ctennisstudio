import type React from "react"
import styles from "./RacquetBlueprint.module.css"

const MAINS = Array.from({ length: 16 }, (_, i) => 60 + i * 28)
const CROSSES = Array.from({ length: 12 }, (_, i) => 92 + i * 28)

interface RacquetBlueprintProps {
  label: string
  /** Shows the POINT, SET and MATCH markers (the equilibrado page) */
  markers?: boolean
}

// Racquet side view drafted in lines on the page's own colors, so it works in light and dark mode.
const RacquetBlueprint: React.FC<RacquetBlueprintProps> = ({ label, markers = false }) => (
  <svg
    viewBox="0 0 1200 520"
    className={styles.figure}
    {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
  >
    <defs>
      <clipPath id="racquet-head">
        <ellipse cx="270" cy="250" rx="222" ry="154" />
      </clipPath>
    </defs>

    {/* Drafting marks: centre line, and the racquet's length and head height (no numbers) */}
    <g className={styles.drafting}>
      <path className={styles.centerLine} d="M16 250 H1190" />
      <path d="M30 486 H1166 M30 474 V498 M1166 474 V498" />
      <path d="M8 80 V420 M-4 80 H20 M-4 420 H20" />
    </g>

    <g clipPath="url(#racquet-head)" className={styles.strings}>
      {MAINS.map((x) => (
        <line key={x} x1={x} y1="80" x2={x} y2="420" />
      ))}
      {CROSSES.map((y) => (
        <line key={y} x1="30" y1={y} x2="510" y2={y} />
      ))}
    </g>

    <g className={styles.frame}>
      {/* Hoop */}
      <ellipse cx="270" cy="250" rx="240" ry="170" />
      <ellipse cx="270" cy="250" rx="222" ry="154" />
      {/* Throat */}
      <path d="M500 196 C575 205 635 226 702 232" />
      <path d="M500 304 C575 295 635 274 702 268" />
      <path d="M490 226 C560 232 625 242 702 245" />
      <path d="M490 274 C560 268 625 258 702 255" />
      {/* Grip and butt cap */}
      <rect x="702" y="232" width="446" height="36" rx="3" />
      <rect x="1148" y="226" width="18" height="48" rx="4" />
      <path className={styles.bevel} d="M718 243 H1140 M718 257 H1140" />
    </g>

    {markers && (
      <>
        {/* Lines to the labels are only drawn when the labels sit next to the drawing */}
        <g className={styles.leaders}>
          <path d="M440 130 V30 H464" />
          <path d="M590 250 V338" />
          <path d="M930 250 V338" />
        </g>
        <g className={styles.markers}>
          <circle cx="440" cy="130" r="24" />
          <text x="440" y="141">S</text>
          <circle cx="590" cy="250" r="24" />
          <text x="590" y="261">P</text>
          <circle cx="930" cy="250" r="24" />
          <text x="930" y="261">M</text>
        </g>
      </>
    )}
  </svg>
)

export default RacquetBlueprint
