import React from "react";
import { createGlobalStyle } from "styled-components";

import { ErrorBoundary } from "~/components/shared/ErrorBoundary";

import '~/legacy/styles/global.scss';

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    height: 100%;
    margin: 0;
  }

  #__next {
    height: 100%;
  }
`;

/**
 * Root component, for global store and components
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default MyApp;
