import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, StatusBar, TouchableHighlight } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class qrcodeReader extends React.Component {
  state = { hasCameraPermission: null };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async() => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.containerPer}>
          <View style={styles.form}>
            <Text style={styles.txtPer}>Permita o acesso a sua camera, para lermos o QRCode!</Text>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (hasCameraPermission === false) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.txtTop}>Como bloqueou o accesso a camera não é possivel usar esta função!</Text>
            <Text style={styles.txtButtom}>Para permitir o acesso a camera, reabre a aplicação!</Text>
            <TouchableHighlight onPress={this.back} style={styles.buttonMain}><Text style={styles.buttonTextMain}>Voltar</Text></TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      );
    }

    return ( <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end',}}>
      <
      BarCodeScanner onBarCodeScanned = { this.handleBarCodeScanned }
      style = {StyleSheet.absoluteFillObject}
      />
        </View>
    );
  }
  back = () => {
    this.props.navigation.navigate('Login');
}

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.props.navigation.navigate('Resultado', { sala: data });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight
},
containerPer: {
  flex: 1,
  marginTop: StatusBar.currentHeight + 20
},
form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
},
buttonMain: {
  height: 42,
  backgroundColor: '#f05a5b',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2
},
buttonTextMain: {
  color: '#FFF',
  fontSize: 16
},
txtPer:{
  textAlign: 'center',
  fontSize: 17
},
txtTop:{
  textAlign: 'center',
  marginBottom: 10,
  fontSize: 17
},
txtButtom:{
  textAlign: 'center',
  marginBottom: 10,
  fontSize: 17
}
});