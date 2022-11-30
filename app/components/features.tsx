import { BoltIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: '訪問時間帯の指定可能',
        description:
            '患者さん宅での訪問可能時間帯（例：10時〜12時など）の指定が可能！',
        icon: BoltIcon,
    },
    {
        name: '見積診察時間の指定可能',
        description:
            '見積診察時間の設定で精度アップ！',
        icon: ScaleIcon,
    },
    {
        name: '複数の経由地点',
        description:
            '最大25箇所の経由地点に対応！',
        icon: GlobeAltIcon,
    },
]

export default function Features() {
    return (
        <div className="bg-white py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">A better way to send money.</h2>
                <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name}>
                            <dt>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
