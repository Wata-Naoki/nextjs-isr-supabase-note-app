import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}

export default async function handler(
  // NextApiRequestは、Next.jsのAPIルートで使用されるリクエストオブジェクトの型
  // NextApiResponseは、Next.jsのAPIルートで使用されるレスポンスオブジェクトの型
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Reaching the API notes endpoint')
  if (req.query.secret !== process.env.SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch {
    alert('Error revalidating the session')
  }
  res.json({ revalidated })
}
