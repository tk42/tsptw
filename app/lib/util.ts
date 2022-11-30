import Contact from '../interfaces/contact'

export function contact2waypoint(contact: Contact) {
    return {
        'id': contact.id,
        'name': contact.name,
        'address': contact.address,
        'staying_min': contact.stayingMin,
        'start_time': contact.startTime,
        'end_time': contact.endTime,
        'timestamp': Math.floor(new Date(contact.createdAt).getTime() / 1000)
    }
}