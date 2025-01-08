import { createFetch } from '../server/app.ts'

export default {
  fetch: createFetch('ntp.nict.jp'),
}
