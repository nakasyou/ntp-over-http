/**
 * @example
 * See `scripts/server-demo.ts`.
 * @module
 */

import { Client } from 'ntp-time'

const dateNow = () => performance.timeOrigin + performance.now()

export const createFetch = (
  ntpAddress: string,
  ntpPort?: number,
): (req: Request) => Response => {
  const ntp = new Client(ntpAddress, ntpPort)

  let delta = 0
  const getCrr = () => dateNow() - delta
  ;(async () => {
    while (true) {
      try {
        const synced = await ntp.syncTime()
        delta = dateNow() - synced.time.getTime()
      } catch {}
      await new Promise((r) => setTimeout(r, 100))
    }
  })()

  return (req) => {
    const t2 = getCrr()
    const t1 = Number.parseInt(new URL(req.url).searchParams.get('t1') ?? '')
    const t3 = getCrr()

    const json = JSON.stringify({ t1, t2, t3 })
    return new Response(json, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
