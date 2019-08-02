import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {ReviewPicturesActions} from './actions'

class ReviewPictures extends Component {

    render() {
        const container = {
            border: '1px solid #a6a6a6',
            height: '100px',
            width: '100%',
            float: 'left'
        };

        const img = {
            width: '100%',
            //   height: '100%',
            color: "#a6a6a6",
            float: 'left'
        };

        const imgHolder = {
            textAlign: 'center',
            position: 'relative',
            top: '50%',
            color: "#a6a6a6",
            fontFamily: "Open Sans, Helvetica Neue sans-serif",
            float: 'left'
        };

        const thumbs = this.props.files.map(file => (
            <img key={file.name}
                 src={URL.createObjectURL(file)}
                 style={img}
            />
        ));

        return (
            <Dropzone accept='image/*' multiple onDrop={this.props.onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div style={container} {...getRootProps()}>
                        <input name='picture'  {...getInputProps()} />
                        {/* <img
                src={undefined}
                style={img}
                alt ="Profile Picture"
              /> */}
                        <div style={{display: 'flex'}}>{thumbs}</div>
                    </div>
                )}
            </Dropzone>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    files: ownProps.files,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onDrop: (files) => {
            dispatch(ReviewPicturesActions.onDrop(files));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPictures);