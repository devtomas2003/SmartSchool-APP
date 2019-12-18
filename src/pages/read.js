import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
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
      return <Text> Aceite o accesso a camera </Text>;
    }

    if (hasCameraPermission === false) {
      return <Text> Como bloqueou o accesso a camera não é possivel usar esta função </Text>;
    }

    return ( <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end',}}>
      <
      BarCodeScanner onBarCodeScanned = { this.handleBarCodeScanned }
      style = {StyleSheet.absoluteFillObject}
      />
        </View>
    );
  }

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    this.props.navigation.navigate('Resultado', { sala: data });
  };
}