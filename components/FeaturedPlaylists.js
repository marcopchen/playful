import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import { spotify } from '../store';
import Playlist from './Playlist';

class FeaturedPlaylists extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      featuredPlaylists: ds,
    };
  }

  componentDidMount() {
    this.getFeaturedPlaylists();
  }

  getFeaturedPlaylists() {
    const { featuredPlaylists } = this.state;
    spotify.getFeaturedPlaylists({ country: 'US', limit: 15 })
      .then((response) => {
        this.setState({
          featuredPlaylists: featuredPlaylists.cloneWithRows(response.playlists.items)
        });
      });
  }

  onPlaylist(playlist) {
    const { navigator } = this.props;
    navigator.push({
      component: Playlist,
      title: playlist.name,
      passProps: { playlist }
    });
  }

  renderRow(playlist) {
    return (
      <TouchableHighlight onPress={() => this.onPlaylist(playlist)}>
        <View style={styles.row}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: playlist.images[0].url }}
          />
          <Text style={styles.rowText}>{playlist.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.featuredPlaylists}
        renderRow={this.renderRow.bind(this)}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center'
  },
  rowText: {
    flex: 1,
    margin: 10
  }
});

export default FeaturedPlaylists;
