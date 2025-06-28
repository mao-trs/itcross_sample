import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  )
}
