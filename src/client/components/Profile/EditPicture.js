import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {EditPictureActions} from './actions'

class EditPicture extends Component {

    render() {
        const container = {
            border: '1px solid #a6a6a6',
            height: 225,
            width: 200,
            float: 'left'
        };

        const img = {
            display: 'block',
            width: '100%',
            height: '100%',
            fontFamily: "Open Sans, Helvetica Neue sans-serif",
            textAlign: "center",
            color: "#a6a6a6",
        };

        const imgHolder = {
            textAlign: 'center',
            position: 'relative',
            top: '50%',
            color: "#a6a6a6",
            fontFamily: "Open Sans, Helvetica Neue sans-serif"
        };

        return (
            <Dropzone accept='image/*' disabled={!this.props.edit} onDrop={this.props.onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div style={container}{...getRootProps()}>
                        <input name='picture'  {...getInputProps()} />
                        <img
                            src={this.props.preview == undefined ? this.props.profilePicture.picture : this.props.preview}
                            style={img}
                            alt="Profile Picture"
                        />
                    </div>
                )}
            </Dropzone>
        );
    }
}

const mapStateToProps = (state) => ({
    preview: state.editPicture.get('preview'),
    profilePicture: state.home.get('user'),
    picture: state.profile.get('picture'),
    edit: state.profile.get('edit'),
});

const mapDispatchToProps = (dispatch) => {
    return {
        onDrop: (files) => {
            dispatch(EditPictureActions.onDrop(files[0], URL.createObjectURL(files[0])));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPicture);