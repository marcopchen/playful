import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Track from './Track';

class ToListen extends Component {
  keyExtractor(item) {
    return item.id;
  }

  renderItem({ item }) {
    return (
      <Track track={item} />
    );
  }

  render() {
    const { renderItem, keyExtractor } = this;
    const { toListenTracks } = this.props;
    return (
      <View style={styles.container}>
        {!toListenTracks.length ?
          <Text>Add songs to listen later.</Text> :
          <FlatList
            data={toListenTracks}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />}
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

const mapStateToProps = ({ toListenTracks }) => {
  return { toListenTracks };
};

export default connect(mapStateToProps)(ToListen);
