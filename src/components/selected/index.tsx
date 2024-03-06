import { View,Text } from "react-native"
import Animated, {SlideInDown, BounceOutDown} from "react-native-reanimated"
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  quantity: number, 
  onClear: () => void,
  onSearch: () => void
}
import {styles} from './style'
import { theme } from "@/theme"
import { Button } from "../Button"
export default function Selected({onClear,onSearch,quantity}: Props){
  return(
    <Animated.View style={styles.container} 
    entering={SlideInDown.duration(500)} 
    exiting={BounceOutDown.duration(800)}>
      <View style={styles.header}>
        <Text style={styles.label}>
          {quantity} ingredientes selecionados
        </Text>
        <MaterialIcons name="close" size={24} onPress={onClear}  color={theme.colors.gray_400}/>
      </View>

      <Button title='Encontrar' onPress={onSearch}>

      </Button>
    </Animated.View>
  )
}