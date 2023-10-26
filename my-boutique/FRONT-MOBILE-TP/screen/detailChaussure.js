import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import axios from 'axios';

import { URL } from '../constants/api';



export default function DetailChaussure({ route, navigation }) {
    const [chaussure,setChaussure] = useState([])

    const { id } = route.params

    
    useEffect(() =>{
        const fetchChaussure = async () => {
            try{
                
                const {data, status} = await axios.get(`${URL.fetchChaussureById}/${id}`)
                if(status == 200){
                  // Affiche un message de succès dans la console
                  console.log("succès");
                }
                console.log(data)
                setChaussure(data) 
            }catch(error){
              throw error.message;
            }
        }
        fetchChaussure()
    }, [])

    const deleteChaussure = async () => {
      try{
          const { data, status } = await axios.delete(`${URL.deleteChaussure}/${id}`)
          if(status == 200) console.log(data);
          
      }
      catch(error){
          console.log(error);
          throw { message : error.message, response: error.response.data }
      }
  }
    
  return (
    <View>
        <Text>{chaussure.nom}</Text>
        <Text>{chaussure.prix}</Text>
        <Text>{chaussure.description}</Text>
        <Text>{chaussure.image}</Text>
          <Button 
          title='Modifier'
          onPress={() => {
            navigation.navigate('Update', {
              id: id
            })
          }}

        />
        <Button 
          title='Supprimer'
          onPress={deleteChaussure}
          
        />

     </View>
  );
}

const styles = StyleSheet.create({})