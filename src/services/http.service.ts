import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
const cyberSoftToken = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN

export const http = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    tokenCyberSoft: cyberSoftToken
  }
})
