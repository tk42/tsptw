import { fetchAPI } from './hasura'
import { fetchBackendAPI } from './backend'
import Account, { AccountStatus, AccountStatusLimit } from '../interfaces/account'
import Contact from '../interfaces/contact'


async function createAccount(name: string, email: string, picture: string) {
  const res = await fetchAPI(`
  mutation {
    insert_accounts_one(object: {
      name: "${name}", 
      email: "${email}", 
      picture: "${picture}"
    }) {
      id
      name
      email
      organization
      picture
      created_at
    }
  }`)

  return res.insert_accounts_one.id
}

export async function getAccountIdByEmail(name: string, email: string, picture: string): Promise<Account> {
  const res = await fetchAPI(`
  query {
    accounts(where: {email: {_eq: "${email}"}}) {
      id
      name
      email
      organization
      picture
      status
      created_at
    }
  }`)

  if (res.accounts.length === 0) {
    return createAccount(name, email, picture)
  }
  return res.accounts[0] as Account
}

export async function getContactByAccountEmail(accountId: number, status: AccountStatus) {
  const limit: number = AccountStatusLimit[status]
  const res = await fetchAPI(`
  query {
    accounts_by_pk(id: "${accountId}") {
      account_contacts(limit: ${limit}) {
        contact {
          id
          name
          address
          start_time
          staying_min
          end_time
          created_at
          updated_at
        }
      }
    }
  }`)

  return res.accounts_by_pk.account_contacts.map(element => {
    return {
      'id': element.contact.id,
      'name': element.contact.name,
      'address': element.contact.address,
      'stayingMin': element.contact.staying_min,
      'startTime': element.contact.start_time,
      'endTime': element.contact.end_time,
      'createdAt': element.contact.created_at
    } as Contact
  })
}


export async function addContact(accountId: string, name: string, address: string, stayingMin: number, startTime: string, endTime: string) {
  const res = await fetchAPI(`
  mutation {
    insert_contacts_one(object: {
      name: "${name}",
      address: "${address}",
      staying_min: ${stayingMin},
      start_time: "${startTime}",
      end_time: "${endTime}"
    }
  ) {
      id
      name
      address
      staying_min
      start_time
      end_time
      created_at
    }
  }`)

  await fetchAPI(`
  mutation {
    insert_account_contact_one(object: {
      account_id: "${accountId}", 
      contact_id: "${res.insert_contacts_one.id}"
    }) {
      created_at
    }
  }`)

  return {
    'id': res.insert_contacts_one.id,
    'name': res.insert_contacts_one.name,
    'address': res.insert_contacts_one.address,
    'stayingMin': res.insert_contacts_one.staying_min,
    'startTime': res.insert_contacts_one.start_time,
    'endTime': res.insert_contacts_one.end_time,
    'createdAt': res.insert_contacts_one.created_at
  } as Contact
}

export async function editContact(contactId: string, name: string, address: string, stayingMin: number, startTime: string, endTime: string) {
  const res = await fetchAPI(`
  mutation {
    update_contacts_by_pk(
      pk_columns: {
        id: "${contactId}"
      }, 
      _set: {
        name: "${name}", 
        address: "${address}", 
        staying_min: ${stayingMin},
        start_time: "${startTime}", 
        end_time: "${endTime}"
      }) {
        id
        name
        address
        start_time
        end_time
        staying_min
        created_at
      }
  }`)

  return {
    'id': res.update_contacts_by_pk.id,
    'name': res.update_contacts_by_pk.name,
    'address': res.update_contacts_by_pk.address,
    'stayingMin': res.update_contacts_by_pk.staying_min,
    'startTime': res.update_contacts_by_pk.start_time,
    'endTime': res.update_contacts_by_pk.end_time,
    'createdAt': res.update_contacts_by_pk.created_at
  } as Contact
}

export async function deleteContact(contactId: string) {
  const res = await fetchAPI(`
  mutation {
    delete_contacts_by_pk(id: "${contactId}") {
      id
    }
  }`)
}

export async function findRoute(start_time: string, start: Contact, goal: Contact, waypoints: Contact[]) {
  return await fetchBackendAPI({
    start_time: start_time,
    start: start,
    goal: goal,
    waypoints: waypoints
  })
}