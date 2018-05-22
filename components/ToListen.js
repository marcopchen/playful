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
    const { tracks } = this.props;
    return (
      <View style={styles.container}>
        {!tracks.length ?
          <Text>Add songs to listen later.</Text> :
          <FlatList
            data={tracks}
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

const mapStateToProps = ({ tracks }) => {
  return { tracks };
};

export default connect(mapStateToProps)(ToListen);
