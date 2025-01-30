"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster, toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { FiRefreshCcw, FiCopy, FiSend } from "react-icons/fi"


const ComplimentGenerator = () => {
  const [name, setName] = useState("")
  const [compliment, setCompliment] = useState("")
  const [loading, setLoading] = useState(false)

  const generateCompliment = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { data } = await axios.post("http://localhost:5001/generate", { name: name.trim() }, { timeout: 5000 })
      setCompliment(data.compliment)
     
    } catch (error) {
      toast.error("Failed to fetch compliment 😢")
      setCompliment("Something went wrong. Try again!")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (compliment) {
      navigator.clipboard.writeText(compliment)
      toast.success("Compliment copied to clipboard!")
    } else {
      toast.error("No compliment to copy.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <Toaster position="top-center" />
      <motion.h1
        className="text-5xl font-extrabold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        AI Compliment Generator
        <span className="ml-2 animate-bounce inline-block">🤖✨</span>
      </motion.h1>
      <motion.div
        className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white bg-opacity-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Input
          type="text"
          placeholder="Enter your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-6 p-4 text-2xl rounded-lg shadow-inner bg-white bg-opacity-50 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <Button
          onClick={generateCompliment}
          disabled={loading}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {loading ? <FiRefreshCcw className="animate-spin mr-2" /> : <FiSend className="mr-2" />}
          {loading ? "Generating..." : "Get Compliment"}
        </Button>

        <AnimatePresence>
          {compliment && !loading && (
            <motion.div
              className="mt-6 p-6 bg-white shadow-2xl rounded-xl text-lg text-center text-blue-800 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
             
              <p className="relative z-10">{compliment}</p>
              <motion.button
                onClick={handleCopy}
                className="mt-4 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiCopy className="mr-2" />
                Copy
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ComplimentGenerator

