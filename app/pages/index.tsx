import { useUser } from '@auth0/nextjs-auth0';
import HeroContainer from '../components/hero-container'
import Layout from '../components/layout'
import HeroSection from '../components/hero-section'
import { Container as Header } from '../components/header'
import Head from 'next/head'

type Props = {
}

export default function Index(props: Props) {
  const { user, error, isLoading } = useUser();
  return (
    <>
      <Layout>
        <Head>
          <title>往診巡回経路最適化さん</title>
        </Head>
        <HeroContainer>
          <HeroSection logged_in={user !== undefined}>
            <Header logged_in={user !== undefined} />
          </HeroSection>
        </HeroContainer>
      </Layout>
    </>
  )
}
