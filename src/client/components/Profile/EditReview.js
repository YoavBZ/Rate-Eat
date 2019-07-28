import React, {Component} from 'react';
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
    }
    render(){
        return(
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>                
                <div className="p-col-12 p-md-8 review-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid">
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
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-pencil' onClick={() => this.setState({edit:true})}/>
                    {this.state.edit && <Button label="Submit" onClick={() => {
                    this.setState({edit:false});
                    this.props.updateRatingHandler(
                        this.props.review, this.state.bathroomQuality, this.state.staffKindness, this.state.cleanliness, this.state.driveThruQuality,
                        this.state.deliverySpeed, this.state.foodQuality

                    )}}/>}
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
        updateRatingHandler: (review, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality) => {
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
