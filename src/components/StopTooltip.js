import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import StopSchedule from '~/components/StopSchedule';

const styles = StyleSheet.create({
  info: {
    width: 250,
  },
  name: {
    backgroundColor: 'transparent',
    marginBottom: 5,
    fontSize: 15,
    color: '#000',
  },
  detail: {
    color: '#979797',
    backgroundColor: 'transparent',
    fontSize: 12,
  },
});

export default class StopMarker extends Component {
  render() {
    const stop = this.props.stop;
    return (
      <MapView.Callout>
        <View style={styles.info}>
          <Text style={styles.name}>{stop.name}</Text>
          <Text style={styles.detail}>{stop.address}</Text>
          <Text style={styles.detail}>{stop.city}</Text>
          <StopSchedule id={stop.id} />
        </View>
      </MapView.Callout>
    );
  }
}
