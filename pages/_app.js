import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <NotificationsProvider>
        <Component {...pageProps} />{" "}
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
