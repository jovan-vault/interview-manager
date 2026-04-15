export const dynamic = 'force-dynamic'

import { getInterviewsData } from './home-data'
import HomeClient from './home-client'

export default async function Home() {
  const interviews = await getInterviewsData()
  return <HomeClient interviews={interviews} />
}
