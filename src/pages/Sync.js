import React from 'react';
import { Image } from 'react-native';
import load from '../assets/load.gif';
export default function Sync({ navigation }){
    return(
    <SafeAreaView style={styles.container}>
        <Image source={load} style={styles.errorImage}  />
        <View style={styles.nonetview}>
            <Text style={styles.label}>A sincronizar base de dados com o servidor!</Text>
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
    }
});