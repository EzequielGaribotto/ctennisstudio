"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  const setValue = (value: T) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
      setStoredValue(value)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue]
}
