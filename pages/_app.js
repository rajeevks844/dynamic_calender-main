import "@/styles/globals.css";
import { EventProvider } from "../context/EventContext";

export default function App({ Component, pageProps }) {
  return (
    <EventProvider>
      <Component {...pageProps} />
    </EventProvider>
  );
}
