import React from 'react'
import {View, Text} from 'react-native'
import styles from './BottomGroupButtonStyle'
import {
    Button
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import colors from '../../../comon/colors/colors'

export default function({}) {
    return (
        <View style = {styles.container}>
            <CusButton 
                name = 'user-friends'
                style = {{backgroundColor: colors.red}}
            />
            <CusButton 
                name = 'info'
                style = {{backgroundColor: colors.yellow}}
            />
            <CusButton 
                name = 'share'
                style = {{backgroundColor: colors.boldGreen}}
            />
        </View>
    )
}

const CusButton = ({name, style, onPress}) => {
    return (
        <Button rounded
            style = {[styles.button, style]}
            onPress = {onPress}
        >
            <Icon name = {name} size = {20} color = {colors.white}/>
        </Button>
    )
}