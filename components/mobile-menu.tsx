"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, FileText, Star, Users, Zap, LogIn } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

interface MobileMenuProps {
  user?: any
  onAuthSuccess?: () => void
}

export function MobileMenu({ user, onAuthSuccess }: MobileMenuProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleAuthClick = () => {
    setSheetOpen(false)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = () => {
    setAuthModalOpen(false)
    onAuthSuccess?.()
  }

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              ResumeAI Pro
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-8">
            <Link
              href="#features"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setSheetOpen(false)}
            >
              <Zap className="h-4 w-4" />
              <span>Features</span>
            </Link>
            <Link
              href="/templates"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setSheetOpen(false)}
            >
              <FileText className="h-4 w-4" />
              <span>Templates</span>
            </Link>
            <Link
              href="#testimonials"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setSheetOpen(false)}
            >
              <Star className="h-4 w-4" />
              <span>Reviews</span>
            </Link>
            <Link
              href="#pricing"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setSheetOpen(false)}
            >
              <Users className="h-4 w-4" />
              <span>Pricing</span>
            </Link>

            <div className="border-t pt-4 space-y-4">
              {!user ? (
                <>
                  <Button variant="outline" className="w-full justify-start" onClick={handleAuthClick}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link href="/dashboard" onClick={() => setSheetOpen(false)}>
                      Get Started Free
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setSheetOpen(false)}>
                    Go to Dashboard
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} onSuccess={handleAuthSuccess} />
    </>
  )
}
