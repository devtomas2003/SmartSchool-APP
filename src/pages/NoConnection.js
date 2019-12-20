import React from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, TouchableHighlight } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import nonet from '../assets/nonet.png';
export default function NoConnection({ navigation }){
    async function reConnect(){
        NetInfo.fetch().then(state => {
            if(state.isConnected == true){
                navigation.navigate('Login');
            }else{
                alert("Parece que ainda estás sem internet!");
            }
          });
    }
    return(
    <SafeAreaView style={styles.container}>
        <Image source={nonet} style={styles.errorImage}  />
        <View style={styles.nonetview}>
            <Text style={styles.label}>Pelos vistos, não estás ligado a internet!</Text>
            <Text style={styles.label}>Para usares a app Smart School, liga-te a internet!</Text>
            <TouchableHighlight style={styles.button} onPress={reConnect}><Text style={styles.buttonText}>Tentar Novamente</Text></TouchableHighlight>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label:{
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18
    },
    errorImage: {
        width: 215,
        height: 215,
        resizeMode:'contain'
    },
    nonetview: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 60,
    },
    button: {
        height: 42,
        borderWidth: 1,
        borderColor: '#f05a5b',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 2
    },
    buttonText: {
        color: '#444',
        fontSize: 16
    }
});