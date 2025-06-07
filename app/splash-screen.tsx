"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-1">ResumeAI Pro</h1>
          <p className="text-sm text-muted-foreground">by Jayashree Rout</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: "0ms" }}></span>
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: "300ms" }}></span>
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: "600ms" }}></span>
        </div>
      </motion.div>
    </motion.div>
  )
}
