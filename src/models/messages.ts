import messagesData from './messages.json'
import { fromBase64, toBase64 } from '../util/base64'

const MESSAGES = sortMessagesDesc(messagesData)

function sortMessagesDesc(message: typeof messagesData) {
  return message
    .sort((aa, bb) => {
      const a = new Date(aa.createdAt)
      const b = new Date(bb.createdAt)
      return a < b ? -1 : a < b ? 1 : 0
    })
    .map((element, index) => ({
      ...element,
      id: (index + 1).toString(),
    }))
}

/**
 * Get messages with pagination support
 * Returns edges, and pageInfo which contains hasNextPage and an endCursor
 * date (encoded in base64) which is used to point to the next page
 * @param limit
 * @param cursor
 */
export function getMessages(
  limitArg: number | null | undefined,
  cursorArg: string | null | undefined
) {
  const limit = limitArg == null ? 5 : limitArg
  // If we have a cursor, then we use it to find
  // the index of the message which was last left off.
  // Otherwise, we just start from the beginning.
  const cursorIndex =
    cursorArg != null
      ? MESSAGES.findIndex(m => m.createdAt === fromBase64(cursorArg))
      : 0

  // Now we slice the messages with the cursorIndex and limit
  // Note that we're slicing with limit + 1, this is to determine if
  // we have a next page
  const messages = MESSAGES.slice(cursorIndex, cursorIndex + limit + 1)
  const hasNextPage = messages.length > limit

  // Now, we slice the last element off since we sliced +1 elements before in
  // messages
  const edges = hasNextPage ? messages.slice(0, -1) : messages

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: toBase64(messages[messages.length - 1].createdAt),
    },
  }
}
