import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {Rating} from 'primereact/rating';
import {connect} from 'react-redux';
import {EditReviewActions} from './actions';

<<<<<<< HEAD


class EditReview extends Component {

    render(){
        return(
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>                
                {console.log(this.props)}
=======
class EditReview extends Component {
    render() {
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>
                {console.log(this.props)}

>>>>>>> ac92c5c209473c7156b80786dd41e847dc49cbf3
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

<<<<<<< HEAD
                <div className="p-col-12 p-md-1 search-icon" style={{ marginTop: '40px' }}>
                    <Button icon='pi pi-pencil' onClick={() => this.props.editMyReview(this.props.review.id)} />
=======
                <div className="p-col-12 p-md-1 search-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-pencil' onClick={() => this.props.editMyReview()}/>
>>>>>>> ac92c5c209473c7156b80786dd41e847dc49cbf3
                    {/* {this.props.editReview && <Button label="Submit" onClick={() => this.props.updateRatingHandler(review, true)}/>} */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>  ({
    editReview: state.editReview.get('editReview'),
<<<<<<< HEAD
    review: ownProps.review

});  

=======
    review: state.editReview.get('review')
});
>>>>>>> ac92c5c209473c7156b80786dd41e847dc49cbf3

const mapDispatchToProps = (dispatch) => {
    return {
        editMyReview: () => {
            console.log(1);
            dispatch(EditReviewActions.editMyReview());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);