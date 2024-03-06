import { Pressable, Image, Text, PressableProps } from "react-native"

import {styles} from './style'

export type IngredientsProps = {
  name: string, 
  image: string, 
  selected?: boolean,
}


export default function Ingredient({name, 
  image, 
  selected = false,
  ...rest 
  }: IngredientsProps & PressableProps){
  return( 
    <Pressable 
      style={[styles.container, selected && styles.selected]} 
      {...rest}
    >
        <Image source={{uri: image }} style={styles.Image}/>
        <Text style={styles.title}>{name}</Text>
    </Pressable>
  )
}