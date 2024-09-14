'use client'

import { SessionProvider } from "next-auth/react"
import { Dashboard } from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  )
}