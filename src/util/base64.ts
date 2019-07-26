export function toBase64(cursor: string) {
  return Buffer.from(cursor).toString('base64')
}

export function fromBase64(hash: string) {
  return Buffer.from(hash, 'base64').toString('ascii')
}
