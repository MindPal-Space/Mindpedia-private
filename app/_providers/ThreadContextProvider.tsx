'use client'

import { Thread } from '@prisma/client'
import { createContext, ReactNode, useContext, useMemo } from 'react'

interface ThreadContextProps {
  threadData: Thread | null
}

const ThreadContext = createContext<ThreadContextProps | undefined>(undefined)

export const useThreadContext = () => {
  const context = useContext(ThreadContext)
  if (!context) {
    throw new Error(
      'useThreadContext must be used within a ThreadContextProvider'
    )
  }
  return context
}

interface ThreadContextProviderProps {
  threadData: Thread | null
  children: ReactNode
}

export const ThreadContextProvider = ({
  threadData,
  children
}: ThreadContextProviderProps) => {
  const contextValue = useMemo(
    () => ({
      threadData
    }),
    [threadData]
  )

  return (
    <ThreadContext.Provider value={contextValue}>
      {children}
    </ThreadContext.Provider>
  )
}
