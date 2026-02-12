/**
 * Cosmo – NASA API fetchers. Fallback to local data if rate-limited or offline.
 */

/** NASA APOD (Astronomy Picture of the Day) – optional daily fact / image */
export type ApodResponse = {
  title: string
  explanation: string
  url?: string
  date: string
}

const APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1'

/** Fetches one APOD item. DEMO_KEY is rate-limited; use env var in production. */
export async function fetchDailyFact(): Promise<ApodResponse | null> {
  try {
    const res = await fetch(APOD_URL)
    if (!res.ok) return null
    const data = await res.json()
    const item = Array.isArray(data) ? data[0] : data
    return item
      ? {
          title: item.title ?? '',
          explanation: item.explanation ?? '',
          url: item.url,
          date: item.date ?? '',
        }
      : null
  } catch {
    return null
  }
}
