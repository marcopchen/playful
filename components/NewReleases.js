import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import { spotify } from '../store';
import Album from './Album';

class NewReleases extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      newReleases: ds,
    };
  }

  componentDidMount() {
    this.getNewReleases();
  }

  getNewReleases() {
    const { newReleases } = this.state;
    spotify.getNewReleases({ country: 'US', limit: 25 })
      .then((response) => {
        this.setState({
          newReleases: newReleases.cloneWithRows(response.albums.items.filter(album => album.album_type === 'album'))
        });
      });
  }

  onAlbum(album) {
    const { navigator } = this.props;
    navigator.push({
      component: Album,
      title: album.name,
      passProps: { album }
    });
  }

  renderRow(album) {
    return (
      <TouchableHighlight onPress={() => this.onAlbum(album)}>
        <View style={styles.row}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: album.images[0].url }}
          />
          <Text style={styles.rowText}>{album.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.newReleases}
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

export default NewReleases;
