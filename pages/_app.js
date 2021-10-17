import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>Copydock</title>
        <meta
          name="description"
          content="Copydock is a text sharing app where you can paste the text and share it with your friends with a URL for them to copy. "
        />
        <meta name="theme-color" content="#222222" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://copydock.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Copydock" />
        <meta
          property="og:description"
          content="Copydock is a text sharing app where you can paste the text and share it with your friends with a URL for them to copy. "
        />
        <meta property="og:image" content="https://i.imgur.com/h6Bf4zz.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="copydock.vercel.app" />
        <meta property="twitter:url" content="https://copydock.vercel.app/" />
        <meta name="twitter:title" content="Copydock" />
        <meta
          name="twitter:description"
          content="Copydock is a text sharing app where you can paste the text and share it with your friends with a URL for them to copy. "
        />
        <meta name="twitter:image" content="https://i.imgur.com/h6Bf4zz.png" />
      </Head>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <NotificationsProvider>
          <Component {...pageProps} />{" "}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
