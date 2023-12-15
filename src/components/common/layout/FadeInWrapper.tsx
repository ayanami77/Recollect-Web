import { m, AnimatePresence } from 'framer-motion'
import { FC, ReactNode } from 'react'

type FadeInWrapperProps = {
  children: ReactNode
}
export const FadeInWrapper: FC<FadeInWrapperProps> = (props) => {
  const { children } = props

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
