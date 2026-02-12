/**
 * Cosmo – Top Left: Logo + Real/Visual Mode toggle.
 */
import { motion } from 'framer-motion'
import { RealismToggle } from './RealismToggle'

export function HUD() {
  return (
    <motion.div
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <h1 className="text-lg font-light tracking-[0.3em] text-white">COSMO</h1>
      <RealismToggle />
    </motion.div>
  )
}
