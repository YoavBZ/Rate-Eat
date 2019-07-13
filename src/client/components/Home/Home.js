import React, {Component} from 'react';
import HomeActions from './actions';
import {connect} from 'react-redux';
import {Menu} from 'primereact/menu';

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
                                    window.location.hash = "/fileupload";
                                }
                            },
                                {label: 'Restaurants', icon: 'pi pi-fw pi-home', url: 'http://primetek.com.tr'}]
                        },
                        {
                            label: 'Profile',
                            items: [{
                                label: 'Edit User', icon: 'pi pi-fw pi-cog', command: () => {
                                    window.location.hash = "/";
                                }
                            },
                                {label: 'Reviews', icon: 'pi pi-fw pi-copy'}]
                        }
                    ]}/>
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