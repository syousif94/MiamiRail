import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { getNearestStop } from '~/lib/location';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 35,
    backgroundColor: 'transparent',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btn: {
    height: 54,
    width: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 1,
  },
});

const mapStateToProps = state => ({
  selected: state.routes.selected,
});

@connect(mapStateToProps)
export default class NearestStop extends Component {
  _selectNearest = async () => {
    try {
      const nearest = await getNearestStop();
      if (this.props.selected === nearest.id) {
        this.props.hide();
      } else {
        this.props.select(nearest.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.wrap} pointerEvents="box-none">
        <TouchableOpacity style={styles.btn} onPress={this._selectNearest}>
          <Image source={require('~/assets/nearest.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
