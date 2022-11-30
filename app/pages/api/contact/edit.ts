import { NextApiRequest, NextApiResponse } from 'next'
import { editContact } from '../../../lib/api'
import Contact from '../../../interfaces/contact'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contact: Contact = await editContact(req.body.contactId, req.body.name, req.body.address, req.body.stayingMin, req.body.startTime, req.body.endTime)
    res.status(200).json(contact)
}