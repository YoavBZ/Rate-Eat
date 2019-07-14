import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from "primereact/button";
import RestaurantsPageActions from "./actions";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Panel} from "primereact/panel";
import {Rating} from 'primereact/rating';

export class RestaurantsPage extends Component {

    componentDidMount() {
        this.props.getRestaurants();
    }

    render() {
        const header = this.renderHeader();
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Restaurants</h1>
                <DataView value={this.props.restaurants} layout={this.props.layout} header={header}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={5}
                          sortOrder={this.props.sortOrder} sortField={this.props.sortField}/>

                <Dialog header="Restaurant Details" visible={this.props.visible} width="225px" modal={true}
                        onHide={() => this.props.changeVisibility(false)}>
                    {this.renderRestaurantDialogContent()}
                </Dialog>

                <Dialog header="Restaurant Review" visible={this.props.visibleReview} width="225px" modal={true}
                        onHide={() => this.props.changeVisibilityReview(false)}>
                    {this.renderRestaurantReviewContent()}
                </Dialog>
            </div>
        );
    }

    renderListItem(restaurant) {
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-col-12 p-md-3">
                    <img placeholder={'Image'} src={restaurant.image} alt={restaurant.name}/>
                </div>
                <div className="p-col-12 p-md-8 restaurant-details">
                    <div className="p-grid">
                        <div className="p-col-2 p-sm-6">Name:</div>
                        <div className="p-col-10 p-sm-6">{restaurant.name}</div>

                        <div className="p-col-2 p-sm-6">Location:</div>
                        <div className="p-col-10 p-sm-6">{restaurant.year}</div>

                        <div className="p-col-2 p-sm-6">Rating:</div>
                        <div className="p-col-10 p-sm-6">{restaurant.score}</div>

                    </div>
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-search' onClick={() => this.props.selectRestaurant(restaurant, true)}/>
                </div>
                {/*//here we send restaurant to give new review*/}
                <div className="p-col-12 p-md-1 plus-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-plus' onClick={() => this.props.selectReview(restaurant, true)}/>
                </div>
            </div>);
    }

    renderGridItem(restaurant) {
        return (
            <div style={{padding: '.5em'}} className="p-col-12 p-md-3">
                <Panel header={restaurant.name} style={{textAlign: 'center'}}>
                    <img placeholder={'Image'} src={restaurant.image} alt={restaurant.name}/>
                    <div className="restaurant-detail">{restaurant.location}</div>
                    <hr className="ui-widget-content" style={{borderTop: 0}}/>
                    <Button icon="pi pi-search" onClick={() => this.props.selectRestaurant(restaurant, true)}/>
                    <Button icon="pi pi-plus" onClick={() => this.props.selectReview(restaurant, true)}/>
                </Panel>
            </div>);
    }

    renderRestaurantReviewContent() {
        if (this.props.selectedReview) {
            return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Rating</h1>
                        <p>Be nice with new rating ;) .</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3 className="first">Bathroom Quality {this.props.bathroomQuality}</h3>
                    <Rating value={this.props.bathroomQuality} cancel={false} onChange={(e) => this.props.rateReview(e, 'bathroomQuality') } />

                    <h3>Staff Kindness {this.props.staffKindness}</h3>
                    <Rating value={this.props.staffKindness} cancel={false} onChange={(e) => this.props.rateReview(e, 'staffKindness')} />

                    <h3>Cleanliness {this.props.cleanliness}</h3>
                    <Rating value={this.props.cleanliness} cancel={false} onChange={(e) => this.props.rateReview(e, 'cleanliness')} />

                    <h3>Drive thru {this.props.driveThruQuality}</h3>
                    <Rating value={this.props.driveThruQuality} onChange={(e) => this.props.rateReview(e, 'driveThruQuality')} />

                    <h3>Delivery Speed {this.props.deliverySpeed}</h3>
                    <Rating value={this.props.deliverySpeed} onChange={(e) => this.props.rateReview(e, 'deliverySpeed')} />

                    <h3>Food Quality {this.props.foodQuality}</h3>
                    <Rating value={this.props.foodQuality} cancel={false} onChange={(e) => this.props.rateReview(e, 'foodQuality')} />

                    <Button icon="pi pi-plus-circle" onClick={() =>
                        this.props.addReview(this.props.bathroomQuality, this.props.staffKindness,
                            this.props.cleanliness, this.props.driveThruQuality, this.props.deliverySpeed,
                            this.props.foodQuality, this.props.pictures)}/>
                </div>
            </div>
        );
        } else {
            return null;
        }
    }

    renderRestaurantDialogContent() {
        if (this.props.selectedRestaurant) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img placeholder={'Image'} src={this.props.selectedRestaurant.image}
                             alt={this.props.selectedRestaurant.name}/>
                    </div>

                    <div className="p-col-4">Name:</div>
                    <div className="p-col-8">{this.props.selectedRestaurant.name}</div>

                    <div className="p-col-4">Location:</div>
                    <div className="p-col-8">{this.props.selectedRestaurant.location}</div>

                    <div className="p-col-4">Rating:</div>
                    <div className="p-col-8">{this.props.selectedRestaurant.score}</div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.props.sortKey} placeholder="Sort By"
                              onChange={this.props.onSortChange}/>
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.props.layout} onChange={this.props.changeLayout}/>
                </div>
            </div>
        );
    }

    itemTemplate = (restaurant, layout) => {
        if (!restaurant) {
            return null;
        }
        if (layout === 'list')
            return this.renderListItem(restaurant);
        else if (layout === 'grid')
            return this.renderGridItem(restaurant);
    };
}

const mapStateToProps = (state) => ({
    user: state.home.get('user'),
    restaurants: state.restaurantsPage.get('restaurants'),
    layout: state.restaurantsPage.get('layout'),
    selectedRestaurant: state.restaurantsPage.get('selectedRestaurant'),
    selectedReview: state.restaurantsPage.get('selectedReview'),
    visible: state.restaurantsPage.get('visible'),
    visibleReview: state.restaurantsPage.get('visibleReview'),
    sortKey: state.restaurantsPage.get('sortKey'),
    sortOrder: state.restaurantsPage.get('sortOrder'),

    review: state.restaurantsPage.get('review'),

    userID: state.restaurantsPage.get('review').get('userID'),
    restaurantID: state.restaurantsPage.get('review').get('restaurantID'),
    bathroomQuality: state.restaurantsPage.get('review').get('bathroomQuality'),
    staffKindness: state.restaurantsPage.get('review').get('staffKindness'),
    cleanliness: state.restaurantsPage.get('review').get('cleanliness'),
    driveThruQuality: state.restaurantsPage.get('review').get('driveThruQuality'),
    deliverySpeed: state.restaurantsPage.get('review').get('deliverySpeed'),
    foodQuality: state.restaurantsPage.get('review').get('foodQuality'),
    pictures: state.restaurantsPage.get('review').get('foodQuality')


});

const mapDispatchToProps = (dispatch) => {
    return {
        changeLayout: (event) => {
            dispatch(RestaurantsPageActions.changeLayout(event.value));
        },
        changeVisibility: (visibility) => {
            dispatch(RestaurantsPageActions.changeVisibility(visibility));
        },
        changeVisibilityReview: (visibility) => {
            dispatch(RestaurantsPageActions.changeVisibilityReview(visibility));
        },
        onSortChange: (event) => {
            const value = event.value;
            if (value.indexOf('!') === 0) {
                dispatch(RestaurantsPageActions.onSortChange(-1, value.substring(1, value.length), value));
            } else {
                dispatch(RestaurantsPageActions.onSortChange(1, value, value));
            }
        },
        getRestaurants: () => {
            dispatch(RestaurantsPageActions.getRestaurants())
        },
        selectRestaurant: (restaurant, visible) => {
            dispatch(RestaurantsPageActions.selectRestaurant(restaurant, visible));
        },
        selectReview: (restaurant, visible) => {
            dispatch(RestaurantsPageActions.selectReview(restaurant, visible));
        },
        rateReview: (rate, category) => {
            dispatch(RestaurantsPageActions.rateReview(rate, category));
        },
        addReview: (bathroomQuality, staffKindness, cleanliness,driveThruQuality,
                        deliverySpeed, foodQuality, pictures ) => {
            let review = {
                bathroomQuality: bathroomQuality,
                staffKindness: staffKindness,
                cleanliness: cleanliness,
                driveThruQuality: driveThruQuality,
                deliverySpeed: deliverySpeed,
                foodQuality: foodQuality,
                pictures: pictures
            }
            dispatch(RestaurantsPageActions.addReview(review));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);