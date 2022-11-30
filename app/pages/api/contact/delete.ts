import { NextApiRequest, NextApiResponse } from 'next'
import { deleteContact } from '../../../lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await deleteContact(req.body.accountId, req.body.contactId)
    res.status(200).json({})
}