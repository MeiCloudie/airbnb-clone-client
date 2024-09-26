export interface SearchResults {
  location: { id: number; label: string } | null
  dateRange: { from: Date | undefined; to?: Date | undefined } | undefined
  guests: {
    adults: number
    children: number
    infants: number
    pets: number
  }
}
