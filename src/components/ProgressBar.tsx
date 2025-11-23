"use client"
import React, { useEffect, useState } from "react"

const gradient = "linear-gradient(90deg, #a8e6cf 0%, #dcedc1 50%, #ffd3b6 100%)"


const ProgressBar: React.FC = () => {
  const [scroll, setScroll] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setScroll(percent)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: 6,
      zIndex: 9999,
      background: "rgba(0,0,0,0.04)",
      pointerEvents: "none"
    }}>
      <div style={{
        height: "100%",
        width: `${scroll}%`,
        background: gradient,
        borderRadius: 4,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
        transition: "width 0.15s cubic-bezier(.4,1,.7,1)",
      }} />
    </div>
  )
}

export default ProgressBar