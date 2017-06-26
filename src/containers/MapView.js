import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { load } from '~/reducers/routes';
import StopMarker from '~/components/StopMarker';
import NearestStop from '~/components/NearestStop';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  lines: state.routes.lines,
  stops: state.routes.stops,
});

const mapDispatchToProps = {
  load,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RouteMap extends Component {
  static initialRegion = {
    latitude: 25.74845713183181,
    latitudeDelta: 0.2317005668499199,
    longitude: -80.259982096194,
    longitudeDelta: 0.1502144816953859,
  };
  componentDidMount() {
    this._stops = {};
    this._selected = null;
    this.props.load();
  }
  _renderOrangeLine = () => {
    if (!this.props.lines) return null;
    return (
      <MapView.Polyline
        coordinates={this.props.lines.ORG}
        strokeWidth={5}
        strokeColor="orange"
        lineCap="round"
      />
    );
  };
  _renderGreenLine = () => {
    if (!this.props.lines) return null;
    return (
      <MapView.Polyline
        coordinates={this.props.lines.GRN}
        strokeWidth={5}
        strokeColor="green"
        lineCap="round"
      />
    );
  };
  _setStopRef = (id, ref) => {
    this._stops[id] = ref;
  };
  _clearSelected = () => {
    this._selected = null;
  };
  _renderStops = () => {
    if (!this.props.stops) return null;
    return this.props.stops.map(stop =>
      <StopMarker
        stop={stop}
        key={stop.id}
        setRef={this._setStopRef}
        clear={this._clearSelected}
      />
    );
  };
  _selectStop = id => {
    if (id === this._selected || !this._stops[id]) return;
    if (this._selected) this._stops[this._selected].hideCallout();
    this._selected = id;
    this._stops[id].showCallout();
  };
  _hideSelected = () => {
    if (!this._selected || !this._stops[this._selected]) return;
    this._stops[this._selected].hideCallout();
    this._selected = null;
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={RouteMap.initialRegion}
          onPress={this._hideSelected}
        >
          {this._renderOrangeLine()}
          {this._renderGreenLine()}
          {this._renderStops()}
        </MapView>
        <NearestStop select={this._selectStop} hide={this._hideSelected} />
      </View>
    );
  }
}
