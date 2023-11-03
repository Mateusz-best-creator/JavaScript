import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { ThemeProvider } from 'styled-components';
import {theme} from './src/infrastructure/theme/index';

import {useFonts as useOswald, Oswald_400Regular,} from '@expo-google-fonts/oswald';
import {useFonts as useLato, Lato_400Regular,} from '@expo-google-fonts/lato';
// authentication context
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';

import Navigation from './src/infrastructure/navigation';

const App = () => {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if(!oswaldLoaded || !latoLoaded) return;

  return (
    <>
    {/* Now every styled component will get theme in his props */}
    {/* docs for theme ==>  https://styled-components.com/docs/advanced */}
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

export default App;
