import React, {Component, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import {Button} from 'primereact/button';
import {Rating} from 'primereact/rating';
import {connect} from 'react-redux';
import {EditReviewActions} from './actions';



class EditReview extends Component {
    state = {
        edit: false,
        bathroomQuality: undefined,
        staffKindness: undefined,
        cleanliness: undefined,
        driveThruQuality: undefined,
        deliverySpeed: undefined,
        foodQuality: undefined,
        restaurantName: undefined,
        files: []
    }

    componentDidMount() {
        this.props.getRestaurantName(this.props.review.restaurantID, (name) => this.setState({restaurantName: name}));
    }


    render(){
        const container = {
            height: '100px',
            width: '100%',
            float: 'left'
          };
      
          const img = {
            width: '100px',
            height: '100px',
            color: "#a6a6a6",
            float: 'left'
          };
      
          
          const imgHolder = {
            textAlign: 'center',
            position: 'relative',
            top: '50%',
            color:"#a6a6a6",
            fontFamily: "Open Sans, Helvetica Neue sans-serif",
            float: 'left'
          };

        const thumbs = this.props.review.pictures.map(pic => (
            <img key={pic}
              src={pic}
              style={img}
            />
        ));

        const thumbs2 = this.state.files.map(file => (
            <img key={file.name}
              src={URL.createObjectURL(file)}
              style={img}
            />
        ));

        return(
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>                
                <div className="p-col-12 p-md-8 review-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid">
                        <div className = "p-col-2 p-ms-6">{this.state.restaurantName}</div>
                        <div className="p-col-2 p-sm-6">Bathroom Quality:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.bathroomQuality == undefined ? this.props.review.bathroomQuality : this.state.bathroomQuality}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({bathroomQuality:e.value})}/>
                        <div className="p-col-2 p-sm-6">Staff Kindness:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.staffKindness == undefined ? this.props.review.staffKindness : this.state.staffKindness}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({staffKindness:e.value})}/>
                        <div className="p-col-2 p-sm-6">Cleanliness:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.cleanliness == undefined ? this.props.review.cleanliness : this.state.cleanliness}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({cleanliness:e.value})}/>
                        <div className="p-col-2 p-sm-6">Drive Thru Quality:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.driveThruQuality == undefined ? this.props.review.driveThruQuality : this.state.driveThruQuality}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({driveThruQuality:e.value})}/>
                        <div className="p-col-2 p-sm-6">Delivery Speed:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.deliverySpeed == undefined ? this.props.review.deliverySpeed : this.state.deliverySpeed}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({deliverySpeed:e.value})}/>
                        <div className="p-col-2 p-sm-6">Food Quality:</div>
                        <Rating className="p-col-2 p-sm-6"
                                cancel={false}
                                value={this.state.foodQuality == undefined ? this.props.review.foodQuality : this.state.foodQuality}
                                disabled={!this.state.edit}
                                onChange={(e)=> this.setState({foodQuality:e.value})}/>
                    </div>
                    <Dropzone accept='image/*' multiple disabled={!this.state.edit} 
                        onDrop={(files) => this.setState({files: files})}>
                        {({getRootProps, getInputProps}) => (
                        <div style = {container} {...getRootProps()}>
                            <input name='picture'  {...getInputProps()} />
                            <div style={{display:'flex'}}>{this.state.files.length == 0? thumbs: thumbs2}</div>
                        </div>
                    )}
                    </Dropzone>
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-pencil' onClick={() => this.setState({edit:true})}/>
                    <Button icon='pi pi-trash' onClick={() => this.props.removeReview(this.props.review._id)}/>
                    {this.state.edit && <Button label="Submit" onClick={() => {
                    this.setState({edit:false});
                    this.props.updateRatingHandler(
                        this.props.review, this.state.bathroomQuality, this.state.staffKindness, this.state.cleanliness, this.state.driveThruQuality,
                        this.state.deliverySpeed, this.state.foodQuality, this.state.files)
                        this.props.updateAVG(this.props.review, this.state.bathroomQuality, this.state.staffKindness, this.state.cleanliness, this.state.driveThruQuality,
                            this.state.deliverySpeed, this.state.foodQuality)
                    }}/>}
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state, ownProps) =>  ({
    review: ownProps.review,
});  


const mapDispatchToProps = (dispatch) => {
    return {
        getRestaurantName: (id, callback) => {
            dispatch(EditReviewActions.getRestaurantName(id, callback));
        },

        updateRatingHandler: (review, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, files) => {
            if(bathroomQuality == undefined){
                bathroomQuality = review.bathroomQuality
            }
            if(staffKindness == undefined){
                staffKindness = review.staffKindness
            }
            if(cleanliness == undefined){
                cleanliness = review.cleanliness
            }
            if(driveThruQuality == undefined){
                driveThruQuality = review.driveThruQuality
            }
            if(deliverySpeed == undefined){
                deliverySpeed = review.deliverySpeed
            }
            if(foodQuality == undefined){
                foodQuality = review.foodQuality
            }

            if (files.length == 0){
                let newReview ={
                    id: review._id,
                    bathroomQuality: bathroomQuality,
                    staffKindness: staffKindness,
                    cleanliness: cleanliness,
                    driveThruQuality: driveThruQuality,
                    deliverySpeed: deliverySpeed,
                    foodQuality: foodQuality
                }
                dispatch(EditReviewActions.editMyReview(newReview));
            }else{
                let formData = new FormData()
                formData.append('id', review._id);
                formData.append('bathroomQuality', bathroomQuality);
                formData.append('staffKindness', staffKindness);
                formData.append('cleanliness', cleanliness);
                formData.append('driveThruQuality', driveThruQuality);
                formData.append('deliverySpeed', deliverySpeed);
                formData.append('foodQuality', foodQuality);
                for ( let i = 0; i<files.length; i++){
                    formData.append('files[]', files[i]);    
                }
                dispatch(EditReviewActions.editMyReviewWithPictures(formData))
            }
        },
        updateAVG: (oldReview, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality) => {
            if(bathroomQuality == undefined){
                bathroomQuality = oldReview.bathroomQuality
            }
            if(staffKindness == undefined){
                staffKindness = oldReview.staffKindness
            }
            if(cleanliness == undefined){
                cleanliness = oldReview.cleanliness
            }
            if(driveThruQuality == undefined){
                driveThruQuality = oldReview.driveThruQuality
            }
            if(deliverySpeed == undefined){
                deliverySpeed = oldReview.deliverySpeed
            }
            if(foodQuality == undefined){
                foodQuality = oldReview.foodQuality
            }

            let newReview = {
                bathroomQuality: bathroomQuality,
                staffKindness: staffKindness,
                cleanliness: cleanliness,
                driveThruQuality: driveThruQuality,
                deliverySpeed: deliverySpeed,
                foodQuality: foodQuality,
            };
            dispatch(EditReviewActions.updateAVG(oldReview, newReview));
        },
        removeReview: (id) =>{
            dispatch(EditReviewActions.deleteReview(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
