import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { URL } from "../constants/api";
import axios from "axios";

export default function UpdateChaussure({ route }){
    const [chaussure, setChaussure] = useState({})

    const { id } = route.params;

    useEffect(() =>{
        const fetchChaussure = async () => {
            try{
                
                const {data, status} = await axios.get(`${URL.fetchChaussureById}/${id}`)
                if(status == 200){
                  // Affiche un message de succès dans la console
                  console.log("succès GET BY ID");
                }
                setChaussure(data) 
            }catch(error){
              throw error.message;
            }
        }
        fetchChaussure()
    }, [])
    

    

    const _onChangeText = (key, value) => {
        setChaussure({...chaussure, [key]: value})

    }
    const _handleSubmit = async () => {
        try{
           
           const { data } = await axios.put(`${URL.updateChaussure}/${id}`, chaussure);
           // Verifie si le statut de la reponse est 201(creation reussie)
           if(data.status == 201) console.log("Chaussure Updated ! 🆗");
           // Affiche un message de succès dans la console
           
        }catch(error){
            // En cas d'erreur, affiche le message d'erreur dans la console
            throw error.message;
        }
        
    }
    
    return (
        <View>
            
            <TextInput 
                defaultValue={chaussure.nom}
                maxLength={20}
                onChangeText={val => _onChangeText('nom', val)}
            />

            <TextInput 
                defaultValue={chaussure.prix}
                maxLength={20}
                onChangeText={val => _onChangeText('prix', val)}
            />

            <TextInput 
                defaultValue={chaussure.description}
                maxLength={20}
                onChangeText={val => _onChangeText('description', val)}
            />

            <TextInput 
                defaultValue={chaussure.image}
                onChangeText={val => _onChangeText('image', val)}
            />

            
            <Button 
                title='Valider'
                onPress={_handleSubmit}
            />
        </View>
    )
}

