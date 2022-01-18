import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
