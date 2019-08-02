import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import DragAndDropActions from './actions'

class DragAndDrop extends Component {

    render() {
        const container = {
            border: '1px solid #a6a6a6',
            height: 225,
            width: 200,
            float: 'left'
        };

        // const thumb = {
        //   border: '1px solid #a6a6a6',
        //   height: 225,
        //   width: 200,
        // };

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

        // const thumbs = this.props.files.map(file => (
        //   <div style={thumb} key={file.name}>
        //       <img
        //         src={file.preview}
        //         style={img}
        //       />
        //   </div>
        // ));

        return (
            <Dropzone accept='image/*' onDrop={this.props.onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div style={container}{...getRootProps()}>
                        <input name='picture'  {...getInputProps()} />
                        <img
                            src={this.props.preview}
                            style={img}
                            alt="Profile Picture"
                        />
                    </div>
                )}
            </Dropzone>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    files: ownProps.files,
    preview: state.dragAndDrop.get('preview')
});

const mapDispatchToProps = (dispatch) => {
    return {
        onDrop: (files) => {
            dispatch(DragAndDropActions.onDrop(files[0], URL.createObjectURL(files[0])));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);

// import React, {useEffect, useState} from 'react';
// import {useDropzone} from 'react-dropzone';

// export default function Previews(props) {
//   const [files, setFiles] = useState([]);
//   const {getRootProps, getInputProps} = useDropzone({
//     accept: 'image/*',
//     onDrop: acceptedFiles => {
//       setFiles(acceptedFiles.map(file => Object.assign(file, {
//         preview: URL.createObjectURL(file)
//       })));
//     }
//   });

//   const thumbs = files.map(file => (
//     <div style={thumb} key={file.name}>
//         <img
//           src={file.preview}
//           alt={"plea"}
//           style={img}
//         />
//     </div>
//   ));

//   useEffect(() => () => {
//     // Make sure to revoke the data uris to avoid memory leaks
//     files.forEach(file => URL.revokeObjectURL(file.preview));
//   }, [files]);

//   return (
//     <section className="thumb">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <div style={container}>
//         {thumbs.length == 0 && "Choose your profile picture"}{thumbs}</div>
//       </div>
//     </section>
//   );
// }
