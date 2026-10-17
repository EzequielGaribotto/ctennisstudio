import type React from "react"
import ReactCountryFlag from "react-country-flag"

// Country flag served from our own domain (public/images/flags/, see `npm run banderas`) instead of
// react-country-flag's default outside CDN, which would send every visitor's IP address to a third party.
interface FlagProps {
  code: string
  /** Text alternative for screen readers (usually the country name) */
  label?: string
  style?: React.CSSProperties
}

export const Flag: React.FC<FlagProps> = ({ code, label, style }) => (
  <ReactCountryFlag
    countryCode={code}
    svg
    cdnUrl="/images/flags/"
    cdnSuffix="svg"
    aria-label={label}
    title={label}
    style={style}
  />
)
