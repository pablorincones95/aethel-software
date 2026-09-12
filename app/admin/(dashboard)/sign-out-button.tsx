"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/admin/actions/auth"

export function SignOutButton() {
  return (
    <Button variant="ghost" size="icon" onClick={() => signOut()}>
      <LogOut className="h-4 w-4" />
      <span className="sr-only">Sign out</span>
    </Button>
  )
}
