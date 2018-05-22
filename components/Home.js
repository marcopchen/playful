import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Button, SearchBar } from 'react-native-elements';
import NewReleases from './NewReleases';
import FeaturedPlaylists from './FeaturedPlaylists';
import ToListen from './ToListen';
import Listened from './Listened';

class Home extends Component {
  constructor() {
    super();
    this.onToListen = this.onToListen.bind(this);
    this.onListened = this.onListened.bind(this);
    this.onNewReleases = this.onNewReleases.bind(this);
    this.onFeaturedPlaylists = this.onFeaturedPlaylists.bind(this);
  }

  onToListen() {
    const { navigator } = this.props;
    navigator.push({
      component: ToListen,
      title: 'To Listen'
    });
  }

  onListened() {
    const { navigator } = this.props;
    navigator.push({
      component: Listened,
      title: 'Listened'
    });
  }

  onNewReleases() {
    const { navigator } = this.props;
    navigator.push({
      component: NewReleases,
      title: 'New Releases'
    });
  }

  onFeaturedPlaylists() {
    const { navigator } = this.props;
    navigator.push({
      component: FeaturedPlaylists,
      title: 'Featured Playlists'
    });
  }

  render() {
    const { onToListen, onListened, onNewReleases, onFeaturedPlaylists } = this;
    return (
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <Text h1 style={{ fontWeight: 'bold' }}>
            Playful
          </Text>
        </View>
        <SearchBar
          lightTheme
          round
          placeholder='Search Tracks'
          containerStyle={styles.card}
          platform='ios'
        />
        <Card title='Library' containerStyle={styles.card}>
          <Button
            title='To Listen'
            onPress={onToListen}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color='steelblue'
            raised
          />
          <Button
            title='Listened'
            onPress={onListened}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color='steelblue'
            raised
          />
        </Card>
        <Card title='Browse' containerStyle={styles.card}>
          <Button
            title='New Releases'
            onPress={onNewReleases}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color='steelblue'
            raised
          />
          <Button
            title='Featured Playlists'
            onPress={onFeaturedPlaylists}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color='steelblue'
            raised
          />
        </Card>
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
  card: {
    margin: 10,
    width: 350,
    borderRadius: 10
  },
  button: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'steelblue'
  },
  buttonText: {
    color: '#fff'
  }
});

const mapStateToProps = ({ tracks }) => {
  return { tracks };
};

export default connect(mapStateToProps)(Home);
