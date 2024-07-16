import {createContext, PropsWithChildren} from 'react';

export type ThemeColor = 'Ligth' | 'Dark';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {adaptNavigationTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const themeContext = createContext({isDark: false, theme: LightTheme});

export const ThemeContextProvide = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? DarkTheme : LightTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme} >
        <themeContext.Provider value={{isDark, theme}}>

        {children}
        </themeContext.Provider>
        </NavigationContainer>
    </PaperProvider>
  );
};
