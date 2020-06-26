import * as React from 'react';
import { StyleSheet, View, Slider, Switch, Button } from 'react-native';
import Roux, { RouxView } from 'react-native-roux-sdk';

export default class App extends React.Component {
  async setupPreview() {
    //  TODO this basic init doesnt work because
    //   onVisualizerReady fires twice immediately when mounting
    //   I haven't figured out why
    try {
      await Roux.initializeScanner();
      await Roux.startPreview();
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RouxView style={styles.roux} onVisualizerReady={this.setupPreview} />
        <View style={styles.actions}>
          <View style={styles.row}>
            <Slider style={styles.slider} />
            <Slider style={styles.slider} />
          </View>
          <View style={styles.row}>
            <Switch />
            <Switch />
            <Switch />
          </View>
          <View style={styles.row}>
            <Button title="start scan" onPress={Roux.startScan} />
            <Button title="stop scan" onPress={Roux.stopScan} />
            <Button title="save scan" onPress={Roux.saveScan} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roux: { flex: 1, backgroundColor: 'blue' },
  actions: { flex: 1, backgroundColor: 'white', padding: 16 },
  slider: { flex: 1 },
  row: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
});
