import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from 'nuqs/server'

export const searchParams = {
  // Pagination
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  // Search query
  q: parseAsString,
  // User filters
  gender: parseAsString.withDefault(''),
  role: parseAsString.withDefault(''),
  // Room filters
  maViTri: parseAsString.withDefault('')
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)
