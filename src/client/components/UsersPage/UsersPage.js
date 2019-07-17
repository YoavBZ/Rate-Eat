import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from "primereact/button";
import UsersPageActions from "./actions";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Panel} from "primereact/panel";
import RatingPage from "./RatingPage";

class UsersPage extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const header = this.renderHeader();
        return (
            <div style={{margin: 'auto', width: '80%'}}>
                <h1 style={{fontFamily: 'sans-serif'}}>Users</h1>
                <DataView value={this.props.users} layout={this.props.layout} header={header}
                          itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                          rows={5} sortOrder={this.props.sortOrder} sortField={this.props.sortField}/>

                <Dialog header="User Review" visible={this.props.visibleReview} width="225px" modal={true}
<<<<<<< HEAD
                        onHide={() => this.props.changeVisibilityReview(false)}
                        onShow={() => this.props.getReviews(this.props.selectedUser._id) }
                                 >
=======
                        onHide={() => {
                            this.props.getReviews(this.props.selectedUser);
                            this.props.changeVisibilityReview(false)
                        }}>
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68
                    <RatingPage/>
                </Dialog>
            </div>
        );
    }

    renderListItem(user) {
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9', display: 'flex'}}>
                <div className="p-col-12 p-md-3" style={{width: '25%'}}>
                    <img placeholder={'Image'} src={user.image} alt={user.name} style={{width: '100%'}}/>
                </div>
                <div className="p-col-12 p-md-8 restaurant-details" style={{textAlign: 'left', margin: 'auto'}}>
                    <div className="p-grid" style={{position: 'relative', left: '-100%'}}>
                        <div className="p-col-2 p-sm-6">Name: <b>{user.username}</b></div>
                        <div className="p-col-2 p-sm-6">Location: <b>{user.location}</b></div>
                    </div>
                </div>

                {/*//here we send restaurant to give new review*/}
                <div className="p-col-12 p-md-1 plus-icon" style={{marginTop: '40px'}}>
                    <Button icon='pi pi-plus' onClick={() => this.props.selectReview(user, true, this.props.rates) }/>
                </div>
            </div>);
    }

    renderGridItem(user) {
        return (
            <div style={{padding: '.5em'}} className="p-col-12 p-md-3">
                <Panel header={user.name} style={{textAlign: 'center', width: '25%'}}>
                    <img placeholder={'Image'} src={user.image} alt={user.username} style={{width: '100%'}}/>
                    <div className="user-detail">{user.location}</div>
                    <hr className="ui-widget-content" style={{borderTop: 0}}/>
                    <Button icon="pi pi-plus" onClick={() => this.props.selectReview(user, true, this.props.rates)}/>
                </Panel>
            </div>);
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

    itemTemplate = (user, layout) => {
        if (!user) {
            return null;
        }
        if (layout === 'list')
            return this.renderListItem(user);
        else if (layout === 'grid')
            return this.renderGridItem(user);
    };
}

const mapStateToProps = (state) => {
    return ({
        rates: state.usersPage.get('rates'),
        users: state.usersPage.get('users'),
        layout: state.usersPage.get('layout'),
        selectedUser: state.usersPage.get('selectedUser'),
        visibleReview: state.usersPage.get('visibleReview'),
        sortKey: state.usersPage.get('sortKey'),
        sortOrder: state.usersPage.get('sortOrder')
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            dispatch(UsersPageActions.getUsers())
        },
        changeLayout: (event) => {
            dispatch(UsersPageActions.changeLayout(event.value));
        },
        changeVisibilityReview: (visible) => {
            dispatch(UsersPageActions.changeVisibilityReview(visible));
        },
        onSortChange: (event) => {
            const value = event.value;
            if (value.indexOf('!') === 0) {
                dispatch(UsersPageActions.onSortChange(-1, value.substring(1, value.length), value));
            } else {
                dispatch(UsersPageActions.onSortChange(1, value, value));
            }
        },
        selectReview: (user, visible, rates) => {
            dispatch(UsersPageActions.selectReview(user, visible, rates ));
        },
<<<<<<< HEAD
        getReviews: (userID) => {
            dispatch(UsersPageActions.getReviews(userID))
=======
        selectReview: (user, visible) => {
            dispatch(UsersPageActions.selectReview(user, visible));
        }, getReviews: (user) => {
            dispatch(UsersPageActions.getReviews(user.id))
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
