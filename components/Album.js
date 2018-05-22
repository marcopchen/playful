import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { spotify } from '../store';
import Track from './Track';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    this.getAlbumTracks();
  }

  getAlbumTracks() {
    const { album } = this.props;
    spotify.getAlbumTracks(album.id)
      .then((response) => {
        this.setState({
          tracks: response.items
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
    const { tracks } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={tracks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
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

export default Album;
