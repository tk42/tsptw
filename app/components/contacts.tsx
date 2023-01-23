import { useState } from 'react'
import AddContact from './add-contact'
import { Container as ContactRow } from './contact-row'
import SearchBox from './search-box'
import { Action, State } from '../lib/select-contact-context';
import Account, { AccountStatusLimit } from '../interfaces/account'


type Props = {
  account: Account
  email: string
  state: State
  dispatch: React.Dispatch<Action>
}

export default function Contacts(props: Props) {
  const [searchText, setSearchText] = useState<string>('')
  const addStateOpen = useState(false)

  return (
    <>
      <AddContact {...{
        accountId: props.account.id,
        open: addStateOpen[0],
        setOpen: addStateOpen[1],
        ...props,
      }} />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-end">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-gray-900">経由地点登録</h1>
            <p className="mt-2 text-sm text-gray-700">
              経由地点の追加は{AccountStatusLimit[props.account.status]}件までです.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              「名称」：経由地点の名称．訪問場所の覚えやすい名称を付けることが可能です．
            </p>
            <p className="mt-2 text-sm text-gray-700">
              「住所」：経由地点の住所．都道府県から番地まで入力してください．郵便番号は不要です．挙動不審の場合はGoogleMapで住所検索をおこない，想定の場所にドロップピンが指されることを確認してください．
            </p>
            <p className="mt-2 text-sm text-gray-700">
              「見積診察時間」：車を停車してから発車するまでのおおよその時間を分刻みで入力してください
            </p>
            <p className="mt-2 text-sm text-gray-700">
              「訪問可能時間帯(始)」：経由地点に到着してもよい最も早い時刻を入力してください
            </p>
            <p className="mt-2 text-sm text-gray-700">
              「訪問可能時間帯(終)」：経由地点に滞在してもよい最も遅い時刻を入力してください
            </p>
            <p className="mt-2 text-sm text-gray-700">
              検索窓で名称のフィルタリングができます.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => {
                if (props.state.contacts.length >= AccountStatusLimit[props.account.status]) {
                  alert(`経由地点の追加は${AccountStatusLimit[props.account.status]}件までです`)
                  return
                }
                addStateOpen[1](true)
              }}
            >
              新規登録
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative mt-1 rounded-md shadow-sm">
                <SearchBox {...{
                  searchText: searchText,
                  setSearchText: setSearchText,
                }} />
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <fieldset>
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="relative pl-1">
                          始
                        </th>
                        <th scope="col" className="relative pl-1">
                          経
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          名称
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          住所
                        </th>
                        <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                          見積診察時間
                        </th>
                        <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                          訪問可能時間帯(始)
                        </th>
                        <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                          訪問可能時間帯(終)
                        </th>
                        <th scope="col" className="py-3.5 pr-5" />
                        <th scope="col" className="py-3.5 pr-5" />
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {props.state.contacts.filter(
                        (person) => (person.name.includes(searchText))
                      ).map((person, personIdx) => (
                        <ContactRow
                          accountId={props.account.id}
                          key={personIdx}
                          person={person}
                          personIdx={personIdx}
                          state={props.state}
                          dispatch={props.dispatch}
                          {...props}
                        />
                      ))}
                    </tbody>
                  </table>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
