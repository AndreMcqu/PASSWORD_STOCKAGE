import React from "react"
 import { Pressable, StyleSheet, Text } from "react-native"

 type Props = {
     title: string,
     type: "primary" | "secondary",
     onPress: () => void
 }
 
 const CtnButton = ({ title, type, onPress }: Props) => {
     const { buttonStyle, textStyle } = styles
     return (
         <Pressable onPress={onPress} style={[buttonStyle, type === "primary" ? styles.primary : styles.secondary]}>
             <Text style={[textStyle, type === "primary" ? styles.primaryText : styles.secondaryText]}>{title}</Text>
         </Pressable>
     )
 }
 
 const styles = StyleSheet.create({
     buttonStyle: {
         padding: 10,        
         marginTop: 10,
         borderRadius: 30,
     },
     textStyle: {
         alignSelf: "center",
         fontSize: 20,
     },
     primary: {
         backgroundColor: "#3BC14A",
     },
     primaryText: {
         color: "#FFFFFF",
     },
     secondary: {
         backgroundColor: "#383F51",
         borderWidth: 1,
         borderColor: "#383F51",
     },
     secondaryText: {
         color: "#FFFFFF",
     },
 })
 
 export default CtnButton