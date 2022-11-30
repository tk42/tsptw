type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="mx-auto">
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  </div>
}

export default Container
