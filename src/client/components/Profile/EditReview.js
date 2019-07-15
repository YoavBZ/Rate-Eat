import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {Rating} from 'primereact/rating';
import {connect} from 'react-redux';
import {EditReviewActions} from './actions';

export class EditReview extends Component {
    render() {
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>
                {console.log(this.props)}

                <div className="p-col-12 p-md-8 review-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid" style={{position: 'relative', left: '-100%'}}>
                        <div className="p-col-2 p-sm-6">Bathroom Quality:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.bathroomQuality}
                                disabled={!this.props.editReview}/>
                        <div className="p-col-2 p-sm-6">Staff Kindness:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.staffKindness}
                                disabled={!this.props.editReview}/>
                        <div className="p-col-2 p-sm-6">Cleanliness:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.cleanliness}
                                disabled={!this.props.editReview}/>
                        <div className="p-col-2 p-sm-6">Drive Thru Quality:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.driveThruQuality}
                                disabled={!this.props.editReview}/>
                        <div className="p-col-2 p-sm-6">Delivery Speed:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.deliverySpeed}
                                disabled={!this.props.editReview}/>
                        <div className="p-col-2 p-sm-6">Food Quality:</div>
                        <Rating className="p-col-2 p-sm-6" cancel={false} value={this.props.review.foodQuality}
                                disabled={!this.props.editReview}/>
                    </div>
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-pencil' onClick={() => this.props.editMyReview()}/>
                    {/* {this.props.editReview && <Button label="Submit" onClick={() => this.props.updateRatingHandler(review, true)}/>} */}
                </div>
            </div>

        )
    }
};

const mapStateToProps = (state) => ({
    editReview: state.editReview.get('editReview'),
    review: state.editReview.get('review')

});

const mapDispatchToProps = (dispatch) => {
    return {
        editMyReview: () => {
            console.log(1)
            dispatch(EditReviewActions.editMyReview());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);