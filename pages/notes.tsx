import { LogoutIcon } from '@heroicons/react/solid'
import React from 'react'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'

const Notes = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Notes">
      <LogoutIcon
        className="h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
    </Layout>
  )
}

export default Notes
