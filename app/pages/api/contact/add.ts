import { NextApiRequest, NextApiResponse } from 'next'
import { addContact } from '../../../lib/api'
import Contact from '../../../interfaces/contact'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const newContact: Contact = await addContact(req.body.accountId, req.body.name, req.body.address, req.body.stayingMin, req.body.startTime, req.body.endTime)
    res.status(200).json(newContact)
}