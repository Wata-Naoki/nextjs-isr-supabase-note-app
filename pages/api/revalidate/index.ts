import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  // NextApiRequestは、Next.jsのAPIルートで使用されるリクエストオブジェクトの型
  // NextApiResponseは、Next.jsのAPIルートで使用されるレスポンスオブジェクトの型
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Reaching the API notes endpoint')
  let revalidated = false

  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch {
    alert('Error revalidating the session')
  }
  res.json({ revalidated })
}
