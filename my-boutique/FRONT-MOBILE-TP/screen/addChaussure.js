import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { URL } from "../constants/api";
import axios from "axios";

export default function AddChaussure(){
    const [chaussure, setChaussure] = useState({
        nom: '', 
        prix: '',
        description: ''
    })

    const _onChangeText = (key, value) => {
        setChaussure({...chaussure, [key]: value})

    }
    const _handleSubmit = async () => {
        try{
            
           const data = await axios.post(URL.postChaussure, chaussure)
           // Verifie si le statut de la reponse est 201(creation reussie)
           if(data.status == 201) return console.log("succès création")
           // Affiche un message de succès dans la console
           console.log(data);
        }catch(error){
            // En cas d'erreur, affiche le message d'erreur dans la console
            throw error.message;
        }
        
    }
    
    return (
        <>
            <TextInput 
            style={styles.TextInput}
                placeholder="Nom"
                maxLength={20}
                onChangeText={val => _onChangeText('nom', val)}
            />

            <TextInput 
            style={styles.TextInput}
                placeholder="Prix"
                maxLength={20}
                onChangeText={val => _onChangeText('prix', val)}
            />

            <TextInput 
            style={styles.TextInput}
                placeholder="Description"
                maxLength={20}
                onChangeText={val => _onChangeText('description', val)}
            />

            <TextInput 
            style={styles.TextInput}
                placeholder="image"
                onChangeText={val => _onChangeText('image', val)}
            />

            <Button 
                title="Valider"
                onPress={_handleSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        height: 50,
        fontSize: 25
    }
})