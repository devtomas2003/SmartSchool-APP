import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Text, SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
export default function Resultado({ navigation }){
    const [disciplina, setDisciplina] = useState('');
    const [prof, setProf] = useState('');
    const [sala, setSala] = useState('');
    const [turma, setTurma] = useState('');
    useEffect(() => {
        async function getTimes() {
            await api.post('/qrcode', { hashSala: navigation.getParam('sala'), time: new Date() }, {
                headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }
            }).then((res)=>{
                setDisciplina(res.data.disciplina);
                setProf(res.data.professor);
                setSala(res.data.sala);
                setTurma(res.data.turma);
            }).catch(function (error){
                console.log(error);
            });
        }
        getTimes();
    }, []);
    return(
<SafeAreaView style={styles.container}>
        <Text>{disciplina}</Text>
        <Text>{prof}</Text>
        <Text>{sala}</Text>
        <Text>{turma}</Text>
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