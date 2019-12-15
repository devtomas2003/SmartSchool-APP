import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function Menu(){
    return <SafeAreaView style={styles.container}><TouchableHighlight style={styles.btnCnt}><Text style={styles.btnText}>Ler QRCODE</Text></TouchableHighlight></SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCnt: {
        backgroundColor: '#f05a5b',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 2
    },
    btnText: {
        color: '#FFF',
        fontSize: 20
    }
});