import axios from 'axios'

const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const PROJECT_API_KEY = import.meta.env.VITE_SUPABASE_KEY

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/rest/v1`,
  headers: {
    apikey: `${PROJECT_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
