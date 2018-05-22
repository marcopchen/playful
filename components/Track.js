import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { addTrack, deleteTrack } from '../store';

class Track extends Component {
  onAddTrack(track) {
    this.props.addTrack(track);
  }

  onDeleteTrack(track) {
    this.props.deleteTrack(track);
  }

  render() {
    const saved = this.props.tracks.find(track => {
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
        onIconPress={() => {
          if (!saved) {
            this.onAddTrack(this.props.track)
          }
          else {
            this.onDeleteTrack(this.props.track)
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

const mapStateToProps = ({ tracks }) => {
  return { tracks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrack: (track) => dispatch(addTrack(track)),
    deleteTrack: (track) => dispatch(deleteTrack(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
