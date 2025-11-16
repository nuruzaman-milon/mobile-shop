import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const config = { runtime: "nodejs" };

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster position="top-right" />
      <NextUIProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </NextUIProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
};

export default App;
