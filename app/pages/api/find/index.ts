import { NextApiRequest, NextApiResponse } from 'next'
import { findRoute } from '../../../lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { start_time, start, goal, waypoints } = req.body
    const result = await findRoute(start_time, start, goal, waypoints)
    res.status(200).json(result)
}