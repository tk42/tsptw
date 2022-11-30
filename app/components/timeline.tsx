import { UserIcon } from '@heroicons/react/20/solid'
import Route from '../interfaces/route'

type Props = {
    timeline: Route[]
}


export default function Timeline(props: Props) {
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {props.timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== props.timeline.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span
                                        className={
                                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-400'
                                        }
                                    >
                                        <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {event.name}{' '}
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <time dateTime={event.predict_min_time}>{event.predict_min_time}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
