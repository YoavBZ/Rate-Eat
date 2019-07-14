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
                          rows={5} sortOrder={this.props.sortOrder} sortField={this.props.sortField}/>

                <Dialog header="Restaurant Details" visible={this.props.visibleRestaurant} width="225px" modal={true}
                        onHide={() => this.props.changeVisibilityRestaurant(false)}>
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
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>
                <div className="p-col-12 p-md-3" style={{width: '25%'}}>
                    <img placeholder={'Image'} src={restaurant.image} alt={restaurant.name} style={{width: '100%'}}/>
                </div>
                <div className="p-col-12 p-md-8 restaurant-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid" style={{position: 'relative', left: '-100%'}}>
                        <div className="p-col-2 p-sm-6">Name: <b>{restaurant.name}</b></div>
                        <div className="p-col-2 p-sm-6">Location: <b>{restaurant.location}</b></div>
                        <div className="p-col-2 p-sm-6">Rating: <b>{restaurant.score || 'N/A'}</b></div>
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
                <Panel header={restaurant.name} style={{textAlign: 'center', width: '25%'}}>
                    <img placeholder={'Image'} src={restaurant.image} alt={restaurant.name} style={{width: '100%'}}/>
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
                    <h3 className="first">Bathroom Quality {this.props.selectedReview.bathroomQuality}</h3>
                    <Rating value={this.props.selectedReview.bathroomQuality} cancel={false}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />

                    <h3>Staff Kindness {this.props.staffKindness}</h3>
                    <Rating value={this.props.staffKindness} cancel={false}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />

                    <h3>Cleanliness {this.props.cleanliness}</h3>
                    <Rating value={this.props.cleanliness} cancel={false}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />

                    <h3>Drive thru {this.props.driveThruQuality}</h3>
                    <Rating value={this.props.driveThruQuality}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />

                    <h3>Delivery Speed {this.props.deliverySpeed}</h3>
                    <Rating value={this.props.deliverySpeed}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />
                    <h3>Food Quality {this.props.foodQuality}</h3>
                    <Rating value={this.props.foodQuality} cancel={false}
                            onChange={(e) => {console.log('NEED TO CHANGE')}} />

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
                             alt={this.props.selectedRestaurant.name} style={{width: '75%'}}/>
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
    visibleRestaurant: state.restaurantsPage.get('visibleRestaurant'),
    selectedReview: state.restaurantsPage.get('selectedReview'),
    visibleReview: state.restaurantsPage.get('visibleReview'),
    sortKey: state.restaurantsPage.get('sortKey'),
    sortOrder: state.restaurantsPage.get('sortOrder')
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeLayout: (event) => {
            dispatch(RestaurantsPageActions.changeLayout(event.value));
        },
        changeVisibilityRestaurant: (visible) => {
            dispatch(RestaurantsPageActions.changeVisibilityRestaurant(visible));
        },
        changeVisibilityReview: (visible) => {
            dispatch(RestaurantsPageActions.changeVisibilityReview(visible));
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);