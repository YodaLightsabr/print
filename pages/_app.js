import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
      <title>Print</title>
      <link rel="favicon" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
  </>;
}
