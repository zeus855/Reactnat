import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// COMPONENTS 
import AddChaussure from "../screen/addChaussure";
import DetailChaussure from "../screen/detailChaussure";
import updateChaussure from "../screen/updateChaussure";
import Accueil from "../screen/accueil";



const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export function chaussureStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="List" component={Accueil} />
            <Stack.Screen name="Detail" component={DetailChaussure}/>
            <Stack.Screen name="Update" component={updateChaussure}/>
        </Stack.Navigator>
    )

}

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Tabs.Navigator >
            <Tabs.Screen name="Accueil" component={chaussureStack} options={{headerShown: false}} />
            <Tabs.Screen name="Add" component={AddChaussure} />

            </Tabs.Navigator>
        </NavigationContainer>
    )
}