import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import Track from './Track';

class Listened extends Component {
  render() {
    const { tracks } = this.props;
    return (
      <View style={styles.container}>
        <Text>Listened songs will go here.</Text> :
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ tracks }) => {
  return { tracks };
};

export default connect(mapStateToProps)(Listened);
