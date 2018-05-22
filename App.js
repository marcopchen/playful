import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';
import store, { setToken } from './store';
import Home from './components/Home';

export default class App extends Component {
  componentDidMount() {
    setToken();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          initialRoute={{
            component: Home,
            title: ''
          }}
          style={{ flex: styles.container }}
        />
      </Provider>
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
