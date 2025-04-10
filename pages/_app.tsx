import React from "react";
import { AppProps } from "next/app";
import "./index.css";
import { ThemeProvider } from "../src/components/ThemeProvider";

// Only import setupMockApi on the client side
if (typeof window !== "undefined") {
  require("../src/setupMockApi");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
