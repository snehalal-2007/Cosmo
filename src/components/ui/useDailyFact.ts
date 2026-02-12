/**
 * Cosmo – Fetches NASA daily fact once on mount; fallback null if API fails.
 */
import { useState, useEffect } from 'react'
import { fetchDailyFact } from '../../utils/nasa'
import type { ApodResponse } from '../../utils/nasa'

export function useDailyFact(): ApodResponse | null {
  const [fact, setFact] = useState<ApodResponse | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchDailyFact().then((data) => {
      if (!cancelled && data) setFact(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return fact
}
