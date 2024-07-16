import 'react-native-gesture-handler';
import React, {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './presentation/navigator/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import { ThemeContextProvide } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const PokedekApp = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContextProvide>
      <StackNavigator />
    </ThemeContextProvide>
    </QueryClientProvider>
  );
};
