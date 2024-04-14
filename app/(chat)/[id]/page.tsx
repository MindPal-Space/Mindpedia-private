import { AI } from '@/app/action'
import { ThreadContextProvider } from '@/app/_providers/ThreadContextProvider'
import { Chat } from '@/components/chat'
import { Header } from '@/components/header'
import { prisma } from '@/server/prisma'
import { nanoid } from 'ai'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export type Props = {
  params: { id: string }
}

export default async function SavedThreadPage({ params }: Props) {
  const threadData = await prisma.thread.findUnique({
    where: {
      id: params.id
    }
  })

  if (!threadData) {
    redirect('/')
  }

  return (
    <ThreadContextProvider threadData={threadData}>
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        <main className="w-full flex flex-col flex-1 bg-muted/50 dark:bg-background">
          <AI
            initialAIState={{ chatId: nanoid(), messages: [] }}
            initialUIState={[]}
          >
            <Chat />
          </AI>
        </main>
      </div>
    </ThreadContextProvider>
  )
}
