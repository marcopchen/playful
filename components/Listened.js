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
    const { listenedTracks } = this.props;
    return (
      <View style={styles.container}>
        {!listenedTracks.length ?
          <Text>Listened songs will go here.</Text> :
          <FlatList
            data={listenedTracks}
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

const mapStateToProps = ({ listenedTracks }) => {
  return { listenedTracks };
};

export default connect(mapStateToProps)(ToListen);
