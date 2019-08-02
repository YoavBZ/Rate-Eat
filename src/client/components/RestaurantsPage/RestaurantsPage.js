import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from "primereact/button";
import {RestaurantsPageActions} from "./actions";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Panel} from "primereact/panel";
import RatingPage from "./RatingPage";
import RatingPageList from "./RatingPageList";
import {AutoComplete} from 'primereact/autocomplete';
import {Slider} from 'primereact/slider';
import MapContainer from "../MapContainer/MapContainer";
import {Rating} from "primereact/components/rating/Rating";
import {coordinates} from "../../coordinates";

class RestaurantsPage extends Component {

    componentDidMount() {
        this.props.getRestaurants(coordinates[this.props.currentUser.location]);
    }

    render() {
        const header = this.renderHeader();
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Restaurants</h1>
                <DataView value={this.props.restaurants} layout={this.props.layout} header={header}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={5} sortOrder={this.props.sortOrder} sortField={this.props.sortField}/>

                <Dialog header="Restaurant Details" visible={this.props.visibleRestaurant} modal={true}
                        style={{height: '85%', width: '85%'}} contentStyle={{overflowX: 'hidden'}}
                        onHide={() => this.props.changeVisibilityRestaurant(false)}>
                    {this.renderRestaurantDialogContent()}
                </Dialog>

                <Dialog header="Restaurant Add Review" visible={this.props.visibleReview} modal={true}
                        style={{height: '85%', width: '50%', overflow: 'overlay'}}
                        onHide={() => this.props.changeVisibilityReview(false)}>
                    <RatingPage selectedRestaurant={this.props.selectedRestaurant}
                                currentUser={this.props.currentUser}/>
                </Dialog>

                <Dialog header="Restaurant List Review" visible={this.props.visibleReviewList} width="225px"
                        modal={true}
                        onHide={() => this.props.changeVisibilityReviewList(false)}
                        onShow={() => this.props.getReviewsList(this.props.selectedRestaurant._id)}
                >
                    <RatingPageList rates={this.props.rates}/>
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

                <div className="p-col-12 p-md-1 plus-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-bars' onClick={() => this.props.selectReviewList(restaurant, true)}/>
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

    renderRestaurantDialogContent() {
        if (this.props.selectedRestaurant) {
            return (
                <div className="p-grid" style={{fontSize: '32px', textAlign: 'center', padding: '40px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img placeholder={'Image'} src={this.props.selectedRestaurant.image}
                             alt={this.props.selectedRestaurant.name} style={{height: '210px', width: '415px'}}/>
                    </div>

                    <div className="p-col-4">Name: {this.props.selectedRestaurant.name} </div>

                    <div className="p-col-4">Location: {this.props.selectedRestaurant.location} </div>

                    <MapContainer name={this.props.selectedRestaurant.name}
                                  position={this.props.selectedRestaurant.coords}/>
                </div>
            );
        } else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'By Name', value: 'name'},
            {label: 'By City', value: 'location'},
            {label: 'Best Ratings', value: '!score'},
            {label: 'Worst Ratings', value: 'score'},
            // {label: 'Closer-Better', value: 'closerBetter'}
        ];
        const rateOptions = [
            {label: 'bathroomQuality', value: 'bathroomQuality'},
            {label: 'StaffKindness', value: 'staffKindness'},
            {label: 'cleanliness', value: 'cleanliness'},
            {label: 'driveThruQuality', value: 'driveThruQuality'},
            {label: 'deliverySpeed', value: 'deliverySpeed'},
            {label: 'foodQuality', value: 'foodQuality'},
            {label: 'score', value: 'score'}
        ];
        return (
            <div>
                <div className="p-grid">
                    <div className="p-col-6" style={{textAlign: 'left'}}>
                        <Dropdown options={sortOptions} value={this.props.sortKey} placeholder="Sort By"
                                  onChange={this.props.onSortChange}/>
                    </div>
                    <div className="p-col-6" style={{textAlign: 'right'}}>
                        <DataViewLayoutOptions layout={this.props.layout} onChange={this.props.changeLayout}/>
                    </div>
                    <div>
                        <div className="p-col-6" style={{textAlign: 'right'}}>
                            <h3>AVG Rating Above {this.props.restaurantsAVGSearch}</h3>
                            <Dropdown options={rateOptions} value={this.props.sortKeyRestaurant} placeholder="Sort By"
                                      onChange={this.props.onSortChangeRestaurant}/>
                            <Rating value={this.props.restaurantsAVGSearch}
                                    onChange={this.props.changeRestaurantsAVG}/>
                            <Button variant="primary"
                                    onClick={() => this.props.searchAVGHandler(
                                        this.props.sortKeyRestaurant, this.props.restaurantsAVGSearch)}
                                    type="submit" label="Search"/>
                        </div>

                        <div>
                            <AutoComplete value={this.props.restaurantsNameSearch}
                                          onChange={this.props.changeRestaurantsNames}
                                          suggestions={this.props.restaurantsNamesFilter}
                                          completeMethod={this.props.filterRestaurantsNames}
                                          size={30} placeholder="Names" minLength={1}/>

                            <Button variant="primary"
                                    onClick={() => this.props.searchHandler(this.props.restaurantsNameSearch)}
                                    type="submit" label="Search"/>
                        </div>
                        <div>
                            <AutoComplete value={this.props.restaurantsLocationSearch}
                                          onChange={this.props.changeRestaurantsLocations}
                                          suggestions={this.props.restaurantsLocationFilter}
                                          completeMethod={this.props.filterRestaurantsLocations}
                                          size={30} placeholder="Locations" minLength={1}/>

                            <Button variant="primary"
                                    onClick={() => this.props.searchLocationHandler(this.props.restaurantsLocationSearch)}
                                    type="submit" label="Search"/>
                        </div>
                    </div>

                </div>
                <div style={{textAlign: 'middle'}}>
                    <Button variant="secondary" style={{padding: '6px'}}
                            onClick={() => this.props.getRestaurants(coordinates[this.props.currentUser.location])}
                            type="submit" label="Clear"/>
                    <Button variant="secondary" style={{padding: '6px'}}
                            onClick={() => this.props.searchNameLocationHandler(this.props.restaurantsNameSearch,
                                this.props.restaurantsLocationSearch, this.props.restaurantsAVGSearch)}
                            type="submit" label="SearchAll"/>
                </div>
                <div style={{textAlign: 'middle'}}>
                    <h3>Closer: {100 - this.props.restaurantsScale}
                        <Slider value={this.props.restaurantsScale} onChange={this.props.setRestaurantsScale}
                                step={10} style={{width: '56em'}}/>
                        Better: {this.props.restaurantsScale}</h3>
                </div>
            </div>

        );
    }

    itemTemplate = (restaurant, layout) => {
        if (!restaurant) {
            return null;
        }
        if (layout === 'list') {
            return this.renderListItem(restaurant);
        } else if (layout === 'grid') {
            return this.renderGridItem(restaurant);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        currentUser: ownProps.currentUser,
        restaurants: state.restaurantsPage.get('restaurants'),
        restaurantsNames: state.restaurantsPage.get('restaurantsNames'),
        restaurantsLocations: state.restaurantsPage.get('restaurantsLocations'),
        restaurantsNamesFilter: state.restaurantsPage.get('restaurantsNamesFilter'),
        restaurantsLocationFilter: state.restaurantsPage.get('restaurantsLocationFilter'),
        restaurantsNameSearch: state.restaurantsPage.get('restaurantsNameSearch'),
        restaurantsLocationSearch: state.restaurantsPage.get('restaurantsLocationSearch'),
        restaurantsAVGSearch: state.restaurantsPage.get('restaurantsAVGSearch'),
        restaurantsScale: state.restaurantsPage.get('restaurantsScale'),
        layout: state.restaurantsPage.get('layout'),
        selectedRestaurant: state.restaurantsPage.get('selectedRestaurant'),
        visibleRestaurant: state.restaurantsPage.get('visibleRestaurant'),
        visibleReview: state.restaurantsPage.get('visibleReview'),
        visibleReviewList: state.restaurantsPage.get('visibleReviewList'),
        sortKey: state.restaurantsPage.get('sortKey'),
        sortKeyRating: state.restaurantsPage.get('sortKeyRating'),
        sortKeyRestaurant: state.restaurantsPage.get('sortKeyRestaurant'),
        sortOrder: state.restaurantsPage.get('sortOrder'),
        sortOrderRating: state.restaurantsPage.get('sortOrderRating'),
        sortField: state.restaurantsPage.get('sortField'),
        sortFieldRating: state.restaurantsPage.get('sortFieldRating'),
        rates: state.restaurantsPage.get('rates')

    });
};

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
        changeVisibilityReviewList: (visible) => {
            dispatch(RestaurantsPageActions.changeVisibilityReviewList(visible));
        },
        onSortChange: (event) => {
            const value = event.value;
            if (value.indexOf('!') === 0) {
                dispatch(RestaurantsPageActions.onSortChange(-1, value.substring(1, value.length), value));
            } else {
                dispatch(RestaurantsPageActions.onSortChange(1, value, value));
            }
        },
        onSortChangeRestaurant: (event) => {
            const value = event.value;
            dispatch(RestaurantsPageActions.onSortChangeRestaurant(value));
        },
        getRestaurants: (userCoords) => {
            dispatch(RestaurantsPageActions.getRestaurants(userCoords));
        },
        getReviewsList: (restaurantID) => {
            dispatch(RestaurantsPageActions.getReviewsList(restaurantID))
        },
        selectRestaurant: (restaurant, visible) => {
            dispatch(RestaurantsPageActions.selectRestaurant(restaurant, visible));
        },
        selectReview: (restaurant, visible) => {
            dispatch(RestaurantsPageActions.selectReview(restaurant, visible));
        },
        selectReviewList: (restaurant, visible) => {
            dispatch(RestaurantsPageActions.selectReviewList(restaurant, visible));
        },
        filterRestaurantsNames: () => {
            dispatch(RestaurantsPageActions.filterRestaurantsNames());
        },
        filterRestaurantsLocations: () => {
            dispatch(RestaurantsPageActions.filterRestaurantsLocations());
        },
        changeRestaurantsNames: (event) => {
            dispatch(RestaurantsPageActions.changeRestaurantsNames(event.value));
        },
        changeRestaurantsLocations: (event) => {
            dispatch(RestaurantsPageActions.changeRestaurantsLocations(event.value));
        },
        changeRestaurantsAVG: (event) => {
            dispatch(RestaurantsPageActions.changeRestaurantsAVG(event.value));
        },
        searchHandler: (search) => {
            dispatch(RestaurantsPageActions.search({search}))
        },
        searchLocationHandler: (search) => {
            dispatch(RestaurantsPageActions.searchLocation({search}))
        },
        searchAVGHandler: (key, search) => {
            dispatch(RestaurantsPageActions.searchAVGHandler({key, search}))
        },
        searchNameLocationHandler: (search, location, avg) => {
            dispatch(RestaurantsPageActions.searchNameLocation({search, location, avg}))
        },
        setRestaurantsScale: (event) => {
            dispatch(RestaurantsPageActions.setRestaurantsScale(event.value));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);
