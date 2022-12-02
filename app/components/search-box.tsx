import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'


type Props = {
    searchText: string
    setSearchText: React.Dispatch<React.SetStateAction<string>>
}


export default function SearchBox(props: Props) {
    return (
        <div className='relative flex flex-start'>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="name"
                    id="name-search"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={props.searchText}
                    onChange={(e) => props.setSearchText(e.target.value)}
                />
            </div>
        </div>
    )
}
