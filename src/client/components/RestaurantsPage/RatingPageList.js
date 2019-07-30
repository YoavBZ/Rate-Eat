import React from "react";
import {Rating} from "primereact/components/rating/Rating";
import {RestaurantsPageActions} from "./actions";
import {connect} from "react-redux";
import {DataView, DataViewLayoutOptions} from "primereact/components/dataview/DataView";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import {Button} from "primereact/button";

class RatingPageList extends React.Component {

    render() {
        const header = this.renderHeader();
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Reviews</h1>
                <DataView value={this.props.rates} onChange={this.props.onRateChange} header={header}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={4} sortOrder={this.props.sortOrderRating} sortField={this.props.sortFieldRating}/>
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
                    <img placeholder={'Image'} src={rate.image}
                         style={{width: '100%'}}/>
                </div>
                <div className="p-col-12 p-md-8 review-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid" style={{position: 'relative', left: '-100%'}}>
                        <div className="p-col-2 p-sm-6">Restaurant Name: </div>
                        {/*<div className="p-col-2 p-sm-6">Restaurant Name: <b>{this.props.selectedUser.username}</b></div>*/}
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
                    <h6>Delivery Speed</h6>
                    <Rating value={rate.deliverySpeed} readonly={true} stars={5} cancel={false}/>
                </div>

                <div className="content-section implementation">
                    <h6>Food Quality</h6>
                    <Rating value={rate.foodQuality} readonly={true} stars={5} cancel={false}/>
                </div>

            </div>);
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest', value: 'publishDate'},
            {label: 'Oldest', value: '!publishDate'}
        ];
        return (
            <div>
                <div className="p-grid">
                    <div className="p-col-6" style={{textAlign: 'left'}}>
                        <Dropdown options={sortOptions} value={this.props.sortKeyRating} placeholder="Sort By"
                                  onChange={this.props.onSortChangeRating}/>
                    </div>
                    <div>
                        <div className="p-col-6" style={{textAlign: 'right'}}>
                            <h3>AVG Rating Above {this.props.restaurantsAVGRating}</h3>
                            <Rating value={this.props.restaurantsAVGRating}
                                    onChange={this.props.changeRestaurantsAVGRating} />
                            <Button variant="primary"
                                    onClick={() => this.props.searchAVGRatingHandler(
                                        this.props.selectedRestaurant._id, this.props.restaurantsAVGRating)}
                                    type="submit" label="Search"/>
                        </div>


                    </div>

                </div>
                <div style={{textAlign: 'middle'}}>
                    <Button variant="secondary" style={{padding: '6px'}}
                            onClick={() => this.props.getReviewsList(this.props.selectedRestaurant._id)}
                            type="submit" label="Back"/>
                </div>
            </div>

        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return ({
        rates: ownProps.rates,
        selectedRestaurant: state.restaurantsPage.get('selectedRestaurant'),
        sortKeyRating: state.restaurantsPage.get('sortKeyRating'),
        sortOrderRating: state.restaurantsPage.get('sortOrderRating'),
        sortFieldRating: state.restaurantsPage.get('sortFieldRating'),
        restaurantsAVGRating: state.restaurantsPage.get('restaurantsAVGRating')
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRateChange: (event) => {
            dispatch(RestaurantsPageActions.onRateChange(event.value));
        },
        onSortChangeRating: (event) => {
            const value = event.value;
            if (value.indexOf('!') === 0) {
                dispatch(RestaurantsPageActions.onSortChangeRating( -1, value, value));
            } else {
                dispatch(RestaurantsPageActions.onSortChangeRating(1, value, value));
            }
        },
        getReviewsList: (restaurantID) => {
            dispatch(RestaurantsPageActions.getReviewsList(restaurantID))
        },
        changeRestaurantsAVGRating: (event) => {
            dispatch(RestaurantsPageActions.changeRestaurantsAVGRating(event.value));
        },
        searchAVGRatingHandler: (restaurantID, search) => {
            dispatch(RestaurantsPageActions.searchAVGRatingHandler({restaurantID, search}))
        },



    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingPageList);
