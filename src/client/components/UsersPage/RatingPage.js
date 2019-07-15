import React from "react";
import {Rating} from "primereact/components/rating/Rating";
import UsersPageActions from "./actions";
import {connect} from "react-redux";

class RatingPage extends React.Component {

    componentDidMount() {
        this.props.getReviews(this.props.selectedUser);
    }

    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Rating List Of </h1>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h5 className="first">Bathroom Quality {this.props.bathroomQuality}</h5>
                    <Rating value={this.props.bathroomQuality} readonly={true} stars={5} cancel={false}/>

                    <h5>Staff Kindness {this.props.staffKindness}</h5>
                    <Rating value={this.props.staffKindness} readonly={true} stars={5} cancel={false}/>

                    <h5>Cleanliness {this.props.cleanliness}</h5>
                    <Rating value={this.props.cleanliness} readonly={true} stars={5} cancel={false}/>

                    <h5>Drive thru {this.props.driveThruQuality}</h5>
                    <Rating value={this.props.driveThruQuality} readonly={true} stars={5} cancel={false}/>

                    <h5>Delivery Speed {this.props.deliverySpeed}</h5>
                    <Rating value={this.props.deliverySpeed} readonly={true} stars={5} cancel={false}/>

                    <h5>Food Quality {this.props.foodQuality}</h5>
                    <Rating value={this.props.foodQuality} readonly={true} stars={5} cancel={false}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        bathroomQuality: state.rates.get('bathroomQuality'),
        staffKindness: state.rates.get('staffKindness'),
        cleanliness: state.rates.get('cleanliness'),
        driveThruQuality: state.rates.get('driveThruQuality'),
        deliverySpeed: state.rates.get('deliverySpeed'),
        foodQuality: state.rates.get('foodQuality')
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReviews: (user) => {
            dispatch(UsersPageActions.getReviews(user))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingPage);