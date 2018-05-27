import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { addTrackToListen, addTrackToListened, deleteTrack } from '../store';

class Track extends Component {
  onAddTrack(track) {
    this.props.addTrackToListen(track);
  }

  onDeleteTrack(track) {
    this.props.deleteTrack(track);
  }

  onTrack(track) {
    this.props.addTrackToListened(track);
    Linking.openURL(track.external_urls.spotify);
  }

  render() {
    const saved = this.props.toListenTracks.find(track => {
      return track.id === this.props.track.id;
    });
    return (
      <CheckBox
        title={this.props.track.name}
        iconRight
        right
        iconType='material'
        checkedIcon='clear'
        uncheckedIcon='add'
        checkedColor='indianred'
        uncheckedColor='steelblue'
        containerStyle={styles.row}
        textStyle={styles.rowText}
        checked={!!saved}
        onPress={() => {
          this.onTrack(this.props.track);
        }}
        onIconPress={() => {
          if (!saved) {
            this.onAddTrack(this.props.track);
          }
          else {
            this.onDeleteTrack(this.props.track);
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    alignItems: 'center'
  },
  rowText: {
    flex: 1
  }
});

const mapStateToProps = ({ toListenTracks }) => {
  return { toListenTracks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrackToListen: (track) => dispatch(addTrackToListen(track)),
    addTrackToListened: (track) => dispatch(addTrackToListened(track)),
    deleteTrack: (track) => dispatch(deleteTrack(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
