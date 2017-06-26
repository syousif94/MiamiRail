import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getSchedule } from '~/reducers/schedules';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  loading: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomColor: 'transparent',
  },
  container: {
    paddingTop: 10,
    height: 90,
  },
  columns: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flex: 1,
  },
  left: {
    marginRight: 2,
  },
  right: {
    marginLeft: 2,
  },
  direction: {
    color: '#000',
    fontSize: 12,
  },
  prediction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  leftData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  route: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginRight: 3,
  },
  GRN: {
    backgroundColor: 'green',
  },
  OUT: {
    backgroundColor: '#e0e0e0',
  },
  ORG: {
    backgroundColor: 'orange',
  },
  time: {
    fontSize: 12,
    color: '#000',
  },
  arrival: {
    fontSize: 12,
    color: '#979797',
  },
  updatedAt: {
    fontSize: 12,
    color: '#979797',
  },
});

const mapStateToProps = (state, props) => ({
  schedule: state.schedules.get(props.id),
  selected: state.routes.selected === props.id,
});

const mapDispatchToProps = {
  getSchedule,
};

const Spinner = () => {
  return (
    <Animatable.View
      style={styles.spinner}
      animation="rotate"
      iterationCount="infinite"
      easing="linear"
      duration={1000}
    />
  );
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StopSchedule extends Component {
  componentDidUpdate(previous) {
    if (!previous.selected && this.props.selected) {
      this._getSchedule();
      this._interval = setInterval(this._getSchedule, 1000);
    } else if (previous.selected && !this.props.selected) {
      clearInterval(this._interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  _getSchedule = () => {
    this.props.getSchedule(this.props.id);
  };
  render() {
    if (!this.props.schedule) {
      return (
        <View style={styles.loading}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.columns}>
          <View style={[styles.column, styles.left]}>
            <Text style={styles.direction}>Northbound</Text>
            {this.props.schedule.nb.map((prediction, i) => {
              const key = `nb${i}`;
              return (
                <View style={styles.prediction} key={key}>
                  <View style={styles.leftData}>
                    <View style={[styles.route, styles[prediction.color]]} />
                    <Text style={styles.time}>{prediction.time}</Text>
                  </View>
                  <Text style={styles.arrival}>{prediction.arrival}</Text>
                </View>
              );
            })}
          </View>
          <View style={[styles.column, styles.right]}>
            <Text style={styles.direction}>Southbound</Text>
            {this.props.schedule.sb.map((prediction, i) => {
              const key = `sb${i}`;
              return (
                <View style={styles.prediction} key={key}>
                  <View style={styles.leftData}>
                    <View style={[styles.route, styles[prediction.color]]} />
                    <Text style={styles.time}>{prediction.time}</Text>
                  </View>
                  <Text style={styles.arrival}>{prediction.arrival}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text style={styles.updatedAt}>
          Updated at {this.props.schedule.updatedAt}
        </Text>
      </View>
    );
  }
}
