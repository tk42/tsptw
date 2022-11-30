
import Features from '../components/features'

type Props = {
    children?: React.ReactNode
}

const Container = ({ children }: Props) => {
    return <>
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl">
                {children}
            </div>
        </div>
        <Features />
    </>
}

export default Container
