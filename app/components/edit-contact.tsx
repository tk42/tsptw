import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatetimeForm from './datetime-form'
import Contact from '../interfaces/contact'

type Props = {
    accountId: string,
    person: Contact,
    contacts: Contact[],
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditContact(props: Props) {
    const [name, setName] = useState<string>(props.person.name)
    const [address, setAddress] = useState<string>(props.person.address)
    const [stayingMin, setStayingMin] = useState<number>(props.person.stayingMin)
    const [startTime, setStartTime] = useState<string>(props.person.startTime)
    const [endTime, setEndTime] = useState<string>(props.person.endTime)

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        {name} を編集
                                    </Dialog.Title>

                                    <div className="flex justify-between sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            名称
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={name}
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            住所
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={address}
                                                id="address"
                                                name="address"
                                                type="text"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            見積診察時間
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={stayingMin}
                                                id="stayingMin"
                                                name="stayingMin"
                                                type="number"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(e) => setStayingMin(parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <DatetimeForm caption="訪問可能時間帯(始)" id="startTime" name="startTime" type="time" placeholder={startTime || props.person.startTime} setDatetime={setStartTime} />
                                    <DatetimeForm caption="訪問可能時間帯(終)" id="endTime" name="endTime" type="time" placeholder={endTime || props.person.endTime} setDatetime={setEndTime} />

                                </div>


                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => fetch('/api/contact/edit', {
                                            method: "POST",
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                "contactId": props.person.id,
                                                "name": name,
                                                "address": address,
                                                "stayingMin": stayingMin,
                                                "startTime": startTime,
                                                "endTime": endTime
                                            })
                                        }).then(async (res) => {
                                            const contact: Contact = await res.json()
                                            props.setContacts(props.contacts.map((c) => {
                                                return (c.id === contact.id) ? contact : c
                                            }))
                                            alert(`修正しました`)
                                            props.setOpen(false)
                                        })}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
