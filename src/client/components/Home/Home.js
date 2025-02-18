import React, {Component} from 'react';
import HomeActions from './actions';
import {HomePages} from './constants';
import {connect} from 'react-redux';
import {Menu} from 'primereact/menu';
import Profile from '../Profile/Profile';
import RestaurantsPage from "../RestaurantsPage/RestaurantsPage";
import UsersPage from "../UsersPage/UsersPage";

class Home extends Component {

    /*
        Main page component.
        Contains 3 sub-page components:
        1. Profile
        2. RestaurantsPage
        3. UsersPage
    */

    render() {
        let models = [
            {
                label: 'Search',
                items: [{
                    label: 'Users', icon: 'pi pi-fw pi-user', command: () => {
                        this.props.changePageHandler(HomePages.SEARCH_USERS)
                    }
                },
                    {
                        label: 'Restaurants', icon: 'pi pi-fw pi-home', command: () => {
                            this.props.changePageHandler(HomePages.SEARCH_RESTAURANTS)
                        }
                    }]
            },
            {
                label: 'Profile',
                items: [{
                    label: 'Edit Profile', icon: 'pi pi-fw pi-cog', command: () => {
                        this.props.changePageHandler(HomePages.PROFILE);
                    }
                }]
            }
        ];
        return (
            <div style={{display: 'flex', textAlign: 'center'}}>
                <Menu model={models} style={{textAlign: 'left'}}/>
                {this.props.page === HomePages.PROFILE && <Profile/>}
                {this.props.page === HomePages.SEARCH_RESTAURANTS && <RestaurantsPage currentUser={this.props.user}/>}
                {this.props.page === HomePages.SEARCH_USERS && <UsersPage/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.home.get('user'),
    page: state.home.get('page'),
});

const mapDispatchToProps = (dispatch) => {
    return {
        changePageHandler: (page) => {
            dispatch(HomeActions.changePage(page))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
