import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster />
      <NextUIProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </NextUIProvider>
    </>
  );
};

export default App;
