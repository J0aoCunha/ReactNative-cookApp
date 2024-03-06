import { View, Text, ScrollView, Alert } from 'react-native'
import {styles} from './style'

import Ingredient from '@/components/ingredient'
import { useState, useEffect} from 'react'
import Selected from '@/components/selected'
import { router } from 'expo-router'
import { services } from '@/services'

export default function Index(){
const  [selected, setSelected] = useState<string[]>([])
const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

function handleToggleSeleted(value:string){
  if(selected.includes(value)){
    return setSelected((state) => state.filter((item)=> item !== value))
  }

  setSelected((state) => [...state, value])
}

function handleClearSelected(){
Alert.alert("limpar", "Deseja limpar tudo?",
  [
    {text: 'Nao', style: "cancel"},
    {text: 'Sim', onPress: ()=> setSelected([ ])}
  ])
}

function handleSearch(){
  router.navigate("/recipes/" + selected)
}

useEffect(()=>{
  services.ingredientes.findAll().then(setIngredients)
}, [])


  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subTitle}>
          os produtos
        </Text>
      </Text>
        <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
        </Text>
        
    <ScrollView contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
      {ingredients.map((item)=>( 
           <Ingredient key={item.id}
           selected={selected.includes(String(item.id))}
           onPress={()=>handleToggleSeleted(String(item.id))} 
           name={item.name}
           id={item.id}
           image={`${services.storage.imagePath}/${item.image}`}/>
        )
      )}
    </ScrollView>

    {
    selected.length > 0 && (   <Selected 
        quantity={selected.length} 
        onClear={()=>handleClearSelected()} 
        onSearch={()=>handleSearch()} />
    )}
    
    </View>
  )
}