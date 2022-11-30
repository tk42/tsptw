import Image from 'next/image'

type Props = {
    children?: React.ReactNode
    logged_in: boolean
}

const HeroSection = ({ children, logged_in }: Props) => {
    return (
        <>
            <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                {children}
                <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                        <div className="sm:flex sm:justify-center">
                            <Image
                                className="inset-0"
                                src="/assets/icons/medical_oushin_car_woman.png"
                                alt="Oushin"
                                width={250}
                                height={170}
                            />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">往診巡回経路</span>{' '}
                            <span className="block text-indigo-600 xl:inline">最適化</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                            組合せ最適化問題の一種である「時間枠付き<span className="text-indigo-600"><a href="https://ja.wikipedia.org/wiki/%E5%B7%A1%E5%9B%9E%E3%82%BB%E3%83%BC%E3%83%AB%E3%82%B9%E3%83%9E%E3%83%B3%E5%95%8F%E9%A1%8C">巡回セールスマン問題</a></span>(Traveling Salesman Problem with Time Windows)」に帰着させることにより，所要時間が最短となる巡回経路を機械的に提案します．
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <a
                                    href={logged_in ? "/top" : "/api/auth/login"}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                                >
                                    Get started
                                </a>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                                >
                                    Read docs
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/assets/abstract/3559926564_Illust__of_many_markers_on_GoogleMap_with_a_directed_graph_which_has_a_transparent_background.png"
                    alt="Abstract"
                    width={512}
                    height={512}
                />
            </div>
        </>
    )
}

export default HeroSection