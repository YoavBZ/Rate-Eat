import React from "react";
import {Rating} from "primereact/components/rating/Rating";
import {RatesConstants} from "./constants";
import {Button} from "primereact/components/button/Button";
import {RestaurantsPageActions} from "./actions";
import {connect} from "react-redux";
import ReviewPictures from "./ReviewPictures";

class RatingPage extends React.Component {
    render() {
        return (
            <div style={{overflow: 'scroll'}}>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Rating </h1>
                        <p>Be nice with new rating ;) .</p>
                    </div>
                </div>

                <div className="content-section implementation" style={{overflow: scroll}}>
                    <h3 className="first">Bathroom Quality {this.props.bathroomQuality}</h3>
                    <Rating value={this.props.bathroomQuality} cancel={false}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.BATHROOM_QUALITY)}/>

                    <h3>Staff Kindness {this.props.staffKindness}</h3>
                    <Rating value={this.props.staffKindness} cancel={false}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.STAFF_KINDNESS)}/>

                    <h3>Cleanliness {this.props.cleanliness}</h3>
                    <Rating value={this.props.cleanliness} cancel={false}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.CLEANLINESS)}/>

                    <h3>Drive thru {this.props.driveThruQuality}</h3>
                    <Rating value={this.props.driveThruQuality}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.DRIVE_THRU_QUALITY)}/>

                    <h3>Delivery Speed {this.props.deliverySpeed}</h3>
                    <Rating value={this.props.deliverySpeed}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.DELIVERY_SPEED)}/>

                    <h3>Food Quality {this.props.foodQuality}</h3>
                    <Rating value={this.props.foodQuality} cancel={false}
                            onChange={(e) => this.props.changeRate(e.value, RatesConstants.FOOD_QUALITY)}/>

                    <ReviewPictures files={this.props.files}/>

                    <Button label="Submit" onClick={() => {
                        this.props.addReview(this.props.currentUser._id, this.props.selectedRestaurant._id,
                            this.props.bathroomQuality, this.props.staffKindness, this.props.cleanliness,
                            this.props.driveThruQuality, this.props.deliverySpeed, this.props.foodQuality, this.props.files);
                        this.props.addAVG(this.props.selectedRestaurant,
                            this.props.bathroomQuality, this.props.staffKindness, this.props.cleanliness,
                            this.props.driveThruQuality, this.props.deliverySpeed, this.props.foodQuality);
                        this.props.clearReview();
                        this.props.clearReviewReopen();
                    }
                    }/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        currentUser: ownProps.currentUser,
        selectedRestaurant: ownProps.selectedRestaurant,
        bathroomQuality: state.rates.get('bathroomQuality'),
        staffKindness: state.rates.get('staffKindness'),
        cleanliness: state.rates.get('cleanliness'),
        driveThruQuality: state.rates.get('driveThruQuality'),
        deliverySpeed: state.rates.get('deliverySpeed'),
        foodQuality: state.rates.get('foodQuality'),
        newScore: state.rates.get('newScore'),
        files: state.rates.get('files'),
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeRate: (rate, category) => {
            dispatch(RestaurantsPageActions.changeRate(rate, category));
        },
        clearReview: () => {
            dispatch(RestaurantsPageActions.clearReview());
        },
        clearReviewReopen: () => {
            dispatch(RestaurantsPageActions.getRestaurants());
        },
        addReview: (nameId, restaurantId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, files) => {
            console.log(files[0])
            let formData = new FormData()
            formData.append('userID', nameId);
            formData.append('restaurantID', restaurantId);
            formData.append('bathroomQuality', bathroomQuality);
            formData.append('staffKindness', staffKindness);
            formData.append('cleanliness', cleanliness);
            formData.append('driveThruQuality', driveThruQuality);
            formData.append('deliverySpeed', deliverySpeed);
            formData.append('foodQuality', foodQuality);
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
            dispatch(RestaurantsPageActions.addReview(formData));
        },
        addAVG: (restaurant, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality, pictures) => {
            let review = {
                restaurant: restaurant,
                bathroomQuality: bathroomQuality,
                staffKindness: staffKindness,
                cleanliness: cleanliness,
                driveThruQuality: driveThruQuality,
                deliverySpeed: deliverySpeed,
                foodQuality: foodQuality,
                pictures: pictures
            };
            dispatch(RestaurantsPageActions.addAVG(review));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingPage);
