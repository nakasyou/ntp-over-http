/**
 * @example
 * ```ts
 * import { Client } from '@ns/ntp-over-http/client'
 * ```
 * @module
 */

/**
 * Client
 */
export class Client {
  #url: string
  #lastOffset: number = 0
  constructor(url: string) {
    this.#url = url
  }
  async syncTime() {
    const url = new URL(this.#url)
    const t1 = performance.now() + performance.timeOrigin
    url.searchParams.append('t1', t1.toString())
    const res = await fetch(url)
    const t4 = performance.now() + performance.timeOrigin
    const { t2, t3 } = await res.json()
    const offset = ((t2 - t1) + (t3 - t4)) / 2
    this.#lastOffset = offset
  }
  getTime(): number {
    return performance.now() + performance.timeOrigin + this.#lastOffset
  }
  getDate(): Date {
    return new Date(this.getTime())
  }
}
