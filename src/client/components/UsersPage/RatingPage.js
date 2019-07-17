import React from "react";
import {Rating} from "primereact/components/rating/Rating";
import UsersPageActions from "./actions";
import {connect} from "react-redux";
import {DataView, DataViewLayoutOptions} from "primereact/components/dataview/DataView";

class RatingPage extends React.Component {

    render() {
        const header = this.renderHeader();
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Reviews</h1>
                <DataView value={this.props.rates} onChange={this.props.onRateChange}
                          layout={this.props.layout} header={header}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={5}/>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.props.layout} onChange={this.props.changeLayout2}/>
                </div>
            </div>
        );
    }

<<<<<<< HEAD

    itemTemplate = (rate, layout) => {
        if (!rate) {
=======
    itemTemplate = (user, layout) => {
        if (!user) {
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68
            return null;
        }
        if (layout === 'list')
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
                    <h5 className="first">Bathroom Quality {rate.bathroomQuality}</h5>
                    <Rating value={rate.bathroomQuality} readonly={true} stars={5} cancel={false}/>

                    <h5>Staff Kindness {rate.staffKindness}</h5>
                    <Rating value={rate.staffKindness} readonly={true} stars={5} cancel={false}/>

                    <h5>Cleanliness {rate.cleanliness}</h5>
                    <Rating value={rate.cleanliness} readonly={true} stars={5} cancel={false}/>

                    <h5>Drive thru {rate.driveThruQuality}</h5>
                    <Rating value={rate.driveThruQuality} readonly={true} stars={5} cancel={false}/>

                    <h5>Delivery Speed {rate.deliverySpeed}</h5>
                    <Rating value={rate.deliverySpeed} readonly={true} stars={5} cancel={false}/>

                    <h5>Food Quality {rate.foodQuality}</h5>
                    <Rating value={rate.foodQuality} readonly={true} stars={5} cancel={false}/>
                </div>
            </div>);
    }
}

<<<<<<< HEAD
=======
// render() {
//     return (
//         <div>
//             <div className="content-section introduction">
//                 <div className="feature-intro">
//                     <h1>Rating List Of </h1>
//                 </div>
//             </div>
//
//             <div className="content-section implementation">
//                 <h5 className="first">Bathroom Quality {this.props.bathroomQuality}</h5>
//                 <Rating value={this.props.bathroomQuality} readonly={true} stars={5} cancel={false}/>
//
//                 <h5>Staff Kindness {this.props.staffKindness}</h5>
//                 <Rating value={this.props.staffKindness} readonly={true} stars={5} cancel={false}/>
//
//                 <h5>Cleanliness {this.props.cleanliness}</h5>
//                 <Rating value={this.props.cleanliness} readonly={true} stars={5} cancel={false}/>
//
//                 <h5>Drive thru {this.props.driveThruQuality}</h5>
//                 <Rating value={this.props.driveThruQuality} readonly={true} stars={5} cancel={false}/>
//
//                 <h5>Delivery Speed {this.props.deliverySpeed}</h5>
//                 <Rating value={this.props.deliverySpeed} readonly={true} stars={5} cancel={false}/>
//
//                 <h5>Food Quality {this.props.foodQuality}</h5>
//                 <Rating value={this.props.foodQuality} readonly={true} stars={5} cancel={false}/>
//             </div>
//         </div>
//     )
// }
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68

const mapStateToProps = (state) => {
    return ({
        rates: state.rates.get('rates'),
        selectedUser: state.usersPage.get('selectedUser'),
        layout: state.rates.get('layout'),
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
        changeLayout2: (event) => {
            dispatch(UsersPageActions.changeLayout2(event.value));
        },
        onRateChange: (event) => {
           dispatch(UsersPageActions.onRateChange(event.value));
        }



    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingPage);
