'use server'

import { AIStateMessage } from '@/app/action'
import { prisma } from '.'

export const saveThreadData = async ({
  threadId,
  messages
}: {
  threadId: string | null
  messages: AIStateMessage[]
}) => {
  if (threadId) {
    return prisma.thread.update({
      where: {
        id: threadId
      },
      data: {
        history: JSON.stringify(messages)
      }
    })
  } else {
    return prisma.thread.create({
      data: {
        title: messages[0].content,
        history: JSON.stringify(messages)
      }
    })
  }
}
