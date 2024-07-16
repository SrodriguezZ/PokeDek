import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { Title } from 'react-native-paper';
import { HomeScreens } from '../screens/home/HomeScreens';
import { Login } from '../screens/login/Login';

export type PropsNavigator = {
    HomeScreen:undefined
    PokemonScreen: {pokemonId:number}
    SearchScreen:undefined
    Login:undefined
}
const Stack = createStackNavigator<PropsNavigator>();

export const  StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false//Quitar nombre
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreens} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      
    </Stack.Navigator>
  );
}