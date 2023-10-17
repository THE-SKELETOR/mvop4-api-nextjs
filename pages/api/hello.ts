// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>,
) {
  const stuff = await fetch('https://ipapi.co/json/')
  const thing = await stuff.json()
  console.log(thing)
  res.status(200).json({ name: 'John Doe' })
  return thing
}
