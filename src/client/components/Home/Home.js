import React, {Component} from 'react';
import HomeActions from './actions';
import {HomePages} from './constants';
import {connect} from 'react-redux';
import {Menu} from 'primereact/menu';
import Profile from '../Profile/Profile';
import RestaurantsPage from "../RestaurantsPage/RestaurantsPage";

export class Home extends Component {
    render() {
        return (
            <div>
                <div className="content-section implementation button-demo">
                    <Menu model={[
                        {
                            label: 'Search',
                            items: [{
                                label: 'Users', icon: 'pi pi-fw pi-user', command: () => {
                                    console.log("hehehehe")
                                }
                            },
                                {label: 'Restaurants', icon: 'pi pi-fw pi-home', url: 'http://primetek.com.tr'}]
                        },
                        {
                            label: 'Profile',
                            items: [{
                                label: 'Edit User', icon: 'pi pi-fw pi-cog', command: () => {
                                    this.props.changePageHandler(HomePages.PROFILE);
                                }
                            },
                                {label: 'Reviews', icon: 'pi pi-fw pi-copy'}]
                        }
                    ]}/>
                    {this.props.page === HomePages.PROFILE && <Profile/>}
                    {this.props.page === HomePages.SEARCH_RESTAURANTS && <RestaurantsPage/>}
                </div>
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