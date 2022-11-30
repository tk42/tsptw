import { useState } from 'react';
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { withPageAuthRequired, UserProfile, getSession } from '@auth0/nextjs-auth0';
import Container from '../../components/container'
import Layout from '../../components/layout'
import { Container as Header } from '../../components/header'
import { Container as FindRoute } from '../../components/findroute'
import Contacts from '../../components/contacts';
import { getAccountIdByEmail, getContactByAccountEmail } from '../../lib/api'
import Contact from '../../interfaces/contact'


type Props = {
    accountId: string
    user: UserProfile
    contacts: Contact[]
};

function Index(props: Props) {
    const [startPointIdx, setStartPointIdx] = useState<number>(0);
    const [wayPointIdxs, setWayPointIdxs] = useState<number[]>([]);

    return (
        <>
            <Layout>
                <Head>
                    <title>往診巡回経路最適化さん</title>
                </Head>
                <Container>
                    <Header logged_in={props.user !== undefined} />
                    <Contacts {...{
                        accountId: props.accountId,
                        contacts: props.contacts,
                        email: props.user.email!,
                        startPointIdx: startPointIdx,
                        setStartPointIdx: setStartPointIdx,
                        wayPointIdxs: wayPointIdxs,
                        setWayPointIdxs: setWayPointIdxs,
                    }} />
                    <FindRoute {...{
                        contacts: props.contacts,
                        startPointIdx: startPointIdx,
                        wayPointIdxs: wayPointIdxs,
                    }} />
                </Container>
            </Layout>
        </>
    )

}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    getServerSideProps: async (ctx) => {
        const session = await getSession(ctx.req, ctx.res)
        const { user } = session
        const accountId = await getAccountIdByEmail(user.name!, user.email!)
        const contacts = await getContactByAccountEmail(accountId)
        return {
            props: {
                accountId,
                user,
                contacts
            }
        }
    }
})

export default Index
