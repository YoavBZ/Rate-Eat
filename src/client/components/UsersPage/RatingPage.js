import React from "react";
import {Rating} from "primereact/components/rating/Rating";
import UsersPageActions from "./actions";
import {connect} from "react-redux";
import {DataView} from "primereact/components/dataview/DataView";

class RatingPage extends React.Component {

    render() {
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Reviews</h1>
                <DataView value={this.props.rates} onChange={this.props.onRateChange}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={4}/>
            </div>
        );
    }


    itemTemplate = (rate) => {
        if (!rate) {
            return null;
        }

        return this.renderListItem(rate);
    };


    renderListItem(rate) {

        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>
                <div className="p-col-12 p-md-3" style={{width: '25%'}}>
                    <img placeholder={'Image'} src={rate.image} alt={this.props.selectedUser.username}
                         style={{width: '100%'}}/>
                </div>
                <div className="p-col-12 p-md-8 review-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid" style={{position: 'relative', left: '-100%'}}>
                        <div className="p-col-2 p-sm-6">User Name: <b>{this.props.selectedUser.username}</b></div>
                        {/*<div className="p-col-2 p-sm-6">Restaurant Name: <b>{this.props.restaurantName}</b></div>*/}
                        {/*<div className="p-col-2 p-sm-6">Location: <b>{user.location}</b></div>*/}
                    </div>
                </div>

                <div className="content-section implementation">
                    <h6 className="first">Bathroom Quality</h6>
                    <Rating value={rate.bathroomQuality} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Staff Kindness</h6>
                    <Rating value={rate.staffKindness} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Cleanliness</h6>
                    <Rating value={rate.cleanliness} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Drive thru</h6>
                    <Rating value={rate.driveThruQuality} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Delivery Speed}</h6>
                    <Rating value={rate.deliverySpeed} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Food Quality</h6>
                    <Rating value={rate.foodQuality} readonly={true} stars={5} cancel={false}/>
                </div>

            </div>);
    }
}


const mapStateToProps = (state, ownProps) => {
    return ({
        rates: ownProps.rates,
        selectedUser: state.usersPage.get('selectedUser'),
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
        showReviews: () => {
            dispatch( UsersPageActions.showReviews() );
        },
        onRateChange: (event) => {
           dispatch(UsersPageActions.onRateChange(event.value));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingPage);
