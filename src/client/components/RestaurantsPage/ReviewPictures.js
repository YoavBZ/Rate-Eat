import React, {Component, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {ReviewPicturesActions} from './actions'


class ReviewPictures extends Component {
  
  render() {
    const container = {
      border: '1px solid #a6a6a6',
      height: 225,
      width: 200,
    };

    const img = {
      width: '100%',
      height: '100%',
      color: "#a6a6a6",
    };

    
    const imgHolder = {
      textAlign: 'center',
      position: 'relative',
      top: '50%',
      color:"#a6a6a6",
      fontFamily: "Open Sans, Helvetica Neue sans-serif"
    };

    const thumbs = this.props.previews.map(preview => (
        <img
          src={preview}
          style={img}
        />
    ));

    return (
      <Dropzone accept='image/*' multiple onDrop={this.props.onDrop}>
        {({getRootProps, getInputProps}) => (
          <div style = {container} {...getRootProps()}>
            <input name='picture'  {...getInputProps()} />
              {/* <img
                src={undefined}
                style={img}
                alt ="Profile Picture"
              /> */}
              <div>{thumbs}</div>
          </div>
        )}
      </Dropzone>
    );
  }
}


const mapStateToProps = (state) => ({
  previews: state.reviewPictures.get('previews'),
  files: state.reviewPictures.get('files'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (files) => {
        let previews = files.map(file=> URL.createObjectURL(file))
        console.log(previews)
        dispatch(ReviewPicturesActions.onDrop(files, previews));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewPictures);