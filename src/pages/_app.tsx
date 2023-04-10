import "@/styles/globals.css";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface MyAppProps {
  Component: NextPage;
  pageProps: any;
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Kueue</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
