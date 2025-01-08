import { Client } from '../client/mod.ts'

const client = new Client('http://localhost:8000')
while (true) {
  await client.syncTime()
  console.log(client.getDate())
}
