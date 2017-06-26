import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import StopTooltip from '~/components/StopTooltip';
import { selectStop } from '~/reducers/routes';

const styles = StyleSheet.create({
  marker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

const mapDispatchToProps = {
  selectStop,
};

@connect(null, mapDispatchToProps)
export default class StopMarker extends Component {
  _select = () => {
    this.props.selectStop(this.props.stop.id);
  };
  _deselect = () => {
    this.props.selectStop(null);
  };
  _setRef = ref => {
    this.props.setRef(this.props.stop.id, ref);
  };
  render() {
    const stop = this.props.stop;
    return (
      <MapView.Marker
        coordinate={stop.coords}
        key={stop.id}
        onPress={this.props.clear}
        onSelect={this._select}
        onDeselect={this._deselect}
        ref={this._setRef}
      >
        <View style={styles.marker}>
          <View style={styles.bg} />
        </View>
        <StopTooltip stop={stop} />
      </MapView.Marker>
    );
  }
}
