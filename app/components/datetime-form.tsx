type Props = {
    caption: string
    id: string
    name: string
    type: string
    placeholder: string
    setDatetime: React.Dispatch<React.SetStateAction<string>>
}

export default function DatetimeForm(props: Props) {
    return (
        <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
                {props.caption}
            </label>
            <div className="mt-1">
                <input
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={props.placeholder}
                    step="300"
                    min="00:00" max="23:55"
                    onChange={(e) => props.setDatetime(e.target.value)}
                />
            </div>
        </div>
    )
}
