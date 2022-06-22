/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react';

import { SignUp, SignIn, Home, Wallet, CheckInterest, Transfer, EditDetails } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Tabs from "./navigation/tabs";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'SignUp'}
            >

                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />

                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="CheckInterest" component={CheckInterest} />
                <Stack.Screen name="Transfer" component={Transfer} />
                <Stack.Screen name="EditDetails" component={EditDetails} />

                {/* <Stack.Screen name="Scan" component={Scan} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
