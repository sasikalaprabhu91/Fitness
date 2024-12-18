import { StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import Appnavigator from './routes/Appnavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { Lighttheme } from './theme/Lighttheme';
import { Darktheme } from './theme/Darktheme';

const Lightscheme = {
  ...MD3LightTheme,
  colors: Lighttheme,
};

const Darkscheme = {
  ...MD3DarkTheme,
  colors: Darktheme,
};

const App = () => {
  const Colorscheme = useColorScheme();
  const theme = Colorscheme === 'dark' ? Darkscheme : Lightscheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Appnavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
