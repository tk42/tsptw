import { fetchAPI } from './hygraph'
import { fetchBackendAPI } from './backend'
import Contact from '../interfaces/contact'
import CalcRequest from '../interfaces/calc-request'


type Items = {
  [key: string]: string
}

async function createAccount(name: string, email: string) {
  const res = await fetchAPI(`
  mutation {
    createAccount(data: {
      name: "${name}"
      email: "${email}"
    }) {
      id
    }
  }`)

  const res2 = await fetchAPI(`
  mutation {
    publishAccount(where: {
      id: "${res.data.createAccount.id}"
    }) {
      id
      name
      email
    }
  }`)

  console.log(res2.json())
  return res.data.createAccount.id
}

export async function getAccountIdByEmail(name: string, email: string) {
  const res = await fetchAPI(`
  query {
    accounts {
      id
      email
    }
  }`)

  const account = res.accounts.find((account: Items) => account.email === email)
  if (account) {
    return account.id
  }
  return createAccount(name, email)
}

export async function getContactByAccountEmail(accountId: string) {
  const res = await fetchAPI(`
  query {
    account(
      where: {
        id: "${accountId}"
      }
    ) {
      contacts {
        id
        name
        address
        stayingMin
        startTime
        endTime
        createdAt
      }
    }
  }`)

  const items: Contact[] = []
  res.account.contacts.forEach(element => {
    items.push({
      'id': element.id,
      'name': element.name,
      'address': element.address,
      'stayingMin': element.stayingMin,
      'startTime': element.startTime,
      'endTime': element.endTime,
      'createdAt': element.createdAt
    } as Contact)
  });

  return items
}


export async function addContact(accountId: string, name: string, address: string, stayingMin: number, startTime: string, endTime: string) {
  const res = await fetchAPI(`
  mutation {
    createContact(
      data: {
        name: "${name}"
        address: "${address}"
        stayingMin: ${stayingMin}
        startTime: "${startTime}"
        endTime: "${endTime}"
      }
    ) {
      id
      name
      address
      stayingMin
      startTime
      endTime
    }
  }`)
  const contactId = res.createContact.id

  await fetchAPI(`
    mutation {
    updateAccount(where: {
      id: "${accountId}"
    }
      data: {
      contacts: {
        connect: {
          where: {
            id: "${contactId}"
          }
        }
      }
    }) {
      id
    },
    publishContact(where: {
      id: "${contactId}"
    }) {
      id
    }
  } `)

  return {
    'id': res.createContact.id,
    'name': res.createContact.name,
    'address': res.createContact.address,
    'stayingMin': res.createContact.stayingMin,
    'startTime': res.createContact.startTime,
    'endTime': res.createContact.endTime
  } as Contact
}

export async function editContact(contactId: string, name: string, address: string, stayingMin: number, startTime: string, endTime: string) {
  const res = await fetchAPI(`
  mutation {
    updateContact(
      where: {
        id: "${contactId}"
      }
      data: {
        name: "${name}"
        address: "${address}"
        stayingMin: ${stayingMin}
        startTime: "${startTime}"
        endTime: "${endTime}"
    }) {
      id
      name
      address
      stayingMin
      startTime
      endTime
    },
    publishContact(where: {
      id: "${contactId}"
    }) {
      id
    }
  }`)

  return {
    'id': res.updateContact.id,
    'name': res.updateContact.name,
    'address': res.updateContact.address,
    'stayingMin': res.updateContact.stayingMin,
    'startTime': res.updateContact.startTime,
    'endTime': res.updateContact.endTime
  } as Contact
}

export async function deleteContact(accountId: string, contactId: string) {
  // delete before unpublish!
  const res = await fetchAPI(`
  mutation {
    unpublishContact(
      where: {
        id: "${contactId}"
      }
    ) {
      id
    },
    deleteContact(
      where: {
        id: "${contactId}"
      }
    ) {
      id
    }
  }`)
}

export async function findRoute(start_time: string, start: Contact, goal: Contact, waypoints: Contact[]) {
  const res = await fetchBackendAPI({
    start_time: start_time,
    start: start,
    goal: goal,
    waypoints: waypoints
  })

  return res.json()
}