import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY)

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString()
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    const maxAge = 24 * 60 * 60
    document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
    document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
  }
})

export default supabase
