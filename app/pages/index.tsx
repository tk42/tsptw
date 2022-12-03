import Layout from '../components/layout'
import Head from 'next/head'
import { Container as Header } from '../components/header'
import HeroContainer from '../components/hero-container'
import HeroSection from '../components/hero-section'

type Props = {
}

export default function Index(props: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>往診巡回経路最適化さん</title>
        </Head>
        <HeroContainer>
          <HeroSection>
            <Header />
          </HeroSection>
        </HeroContainer>
      </Layout>
    </>
  )
}
