import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo-client"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
