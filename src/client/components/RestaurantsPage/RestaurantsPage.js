import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from "primereact/button";
import RestaurantsPageActions from "./actions";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Panel} from "primereact/panel";

export class RestaurantsPage extends Component {

    componentDidMount() {
            this.props.getRestaurants();
    }

    render() {
        const header = this.renderHeader();
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataView</h1>
                        <p>DataView displays data in grid or list layout with pagination, sorting and filtering
                            features.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataView value={this.props.restaurants} layout={this.props.layout} header={header}
                              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                              rows={20}
                              sortOrder={this.props.sortOrder} sortField={this.props.sortField}/>

                    <Dialog header="Restaurant Details" visible={this.props.visible} width="225px" modal={true}
                            onHide={() => this.props.changeVisibility(false)}>
                        {this.renderRestaurantDialogContent()}
                    </Dialog>
                </div>
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
            </div>
        );
    }

    renderGridItem(restaurant) {
        return (
            <div style={{padding: '.5em'}} className="p-col-12 p-md-3">
                <Panel header={restaurant.name} style={{textAlign: 'center'}}>
                    <img placeholder={'Image'} src={restaurant.image} alt={restaurant.name}/>
                    <div className="restaurant-detail">{restaurant.location}</div>
                    <hr className="ui-widget-content" style={{borderTop: 0}}/>
                    <Button icon="pi pi-search" onClick={() => this.props.selectRestaurant(restaurant, true)}/>
                </Panel>
            </div>
        );
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
                    <DataViewLayoutOptions layout={this.props.layout}
                                           onChange={this.props.changeLayout}/>
                </div>
            </div>
        );
    }

    itemTemplate(restaurant, layout) {
        if (!restaurant) {
            return;
        }
        if (layout === 'list')
            return this.renderListItem(restaurant);
        else if (layout === 'grid')
            return this.renderGridItem(restaurant);
    }
}

const mapStateToProps = (state) => ({
    user: state.home.get('user'),
    restaurants: state.restaurantsPage.get('restaurants'),
    layout: state.restaurantsPage.get('layout'),
    selectedRestaurant: state.restaurantsPage.get('selectedRestaurant'),
    visible: state.restaurantsPage.get('visible'),
    sortKey: state.restaurantsPage.get('sortKey'),
    sortOrder: state.restaurantsPage.get('sortOrder')
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeLayout: (event) => {
            dispatch(RestaurantsPageActions.changeLayout(event.value));
        },
        changeVisibility: (visibility) => {
            dispatch(RestaurantsPageActions.changeVisibility(visibility));
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);