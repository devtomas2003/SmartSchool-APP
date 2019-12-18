import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import noNet from '../assets/nonet.svg';
import Svg from 'react-native-svg';
export default function Resultado({ navigation }){

    return(
<SafeAreaView style={styles.container}>
<Svg
    width="200"
    height="200"
    svgXmlData={noNet}
  />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});