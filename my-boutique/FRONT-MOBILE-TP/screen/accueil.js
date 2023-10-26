import React, { useEffect, useState } from "react";

import axios from "axios";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { URL } from "../constants/api";


export default function Accueil({ navigation }) {
    const [chaussure, setChaussure] = useState([])

    useEffect(() => {
        const fetchChaussure = async () => {
            //requete avec axios vers notre Api
            const { data } = await axios.get(URL.fetchAllChaussures)
            setChaussure(data)
            console.log(data);
        }
        fetchChaussure()
    }, [])


      
    
const renderItem = ({ item }) => {
    const { _id, nom, prix, description, image, likes} = item
    return(
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Detail", {
                    id: _id 
                })
            }}
        >

        <View>
            <Text>{nom} : {prix} : {description} : {image} : {likes} </Text>
            
        </View>
        </TouchableOpacity>
    )

}
    return (
        <View>

        <Text>Accueil 🏠</Text>
        <FlatList 
            data={chaussure}
            renderItem={renderItem}  // utilise la fonction 'renderItem' pour afficher chaque element de la liste

            keyExtractor={item => item._id} // utilise l'identifiant (id) de chaque element de la liste comme clé unique
        />

        </View>
    );
}

