import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, TouchableHighlight } from 'react-native';
import update from '../assets/updated.png';
export default function Update({ navigation }){

    const [forceDownload, setForceDownload] = useState(false);
    const [newVersion, setNewVersion] = useState('');

    useEffect(() => {
        if(navigation.getParam('forceDownload') == 1){
            setForceDownload(true);
        }else{
            setForceDownload(false);
        }
        setNewVersion(navigation.getParam('newVersion'));
    });

    function continues(){
        navigation.navigate('Login', { userState: 'decideToContinue' });
    }

    return(
    <SafeAreaView style={styles.container}>
        <Image source={update} style={styles.errorImage}  />
        <View style={styles.updateView}>
            <Text style={styles.label}>Temos novas funcionalidades para você!</Text>
            { forceDownload ? <Text style={styles.label}>Para continuares a usar a app, atualiza para a versão mais recente da APP SmartSchool!</Text> : <Text style={styles.label}>Atualiza para a versão mais recente da APP SmartSchool!</Text> }
            { forceDownload ? null : <Text style={styles.label}>Em breve esta versão deixara de funcionar!</Text> }
            <TouchableHighlight style={styles.button}><Text style={styles.buttonText}>Atualizar ({newVersion})</Text></TouchableHighlight>
            { forceDownload ? null : <TouchableHighlight onPress={continues} style={styles.button}><Text style={styles.buttonText}>Continuar a usar a APP</Text></TouchableHighlight> }
            
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
        fontSize: 18
    },
    errorImage: {
        width: 240,
        height: 240,
        resizeMode:'contain'
    },
    updateView: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
    },
    button: {
        height: 42,
        borderWidth: 1,
        borderColor: '#508ef4',
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