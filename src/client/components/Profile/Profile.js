import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {ProfileActions} from './actions';
import {connect} from 'react-redux';
import {Growl} from 'primereact/growl'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import EditReview from './EditReview';
import EditPicture from './EditPicture';


// This Component will allow a user to edit his entire data in the system.
// Component main attributes:
// EditPicture - Allow a user to change profile picture
// InputText - Username - change the username
// InputText - Password - change the user's password
// InputText - Location - change user's location
// Dataview - displays the users reviews and allow the users to interact with them
// Edit Button - enables editing the user's data
// Submit - submits the new data for the user

class Profile extends Component {

    componentDidMount() {
        this.props.getUserReviews(this.props.user._id);
    }

    render() {
        const inputUsername = {
            display: "block",
            marginBottom: "63px",
            position: "relative",
            left: "5%",
        };

        const inputPassword = {
            display: "block",
            marginBottom: "63px",
            position: "relative",
            left: "5%",
        };

        const locationInput = {
            display: "block",
            position: "relative",
            left: "5%",
        };

        const editBtn = {
            left: "80%",
            top: "-225px",
            width: "77px"
        };

        const submitBtn = {
            left: "60.5%",
            top: "-188px"
        };

        let onSubmit = (res, msg) => {
            if (res) {
                this.growl.show({
                    severity: 'success',
                    summary: 'Update Succeeded',
                    life: 5000,
                    detail: msg
                });
            } else {
                this.growl.show({
                    severity: 'error',
                    summary: 'Update Failed',
                    life: 5000,
                    detail: msg
                });
            }
        };

        return (
            <div>
                <EditPicture/>
                <Growl ref={(el) => this.growl = el}/>
                <InputText placeholder="Username" type="text" defaultValue={this.props.user.username}
                           disabled={!this.props.edit} style={inputUsername} name="username"
                           onChange={(e) => this.props.changeProfileFieldHandler("username", e.target.value)}/>

                <InputText placeholder="Password" type="password"
                           defaultValue={this.props.user.password || '..........'}
                           disabled={!this.props.edit} style={inputPassword} name="password"
                           onChange={(e) => this.props.changeProfileFieldHandler("password", e.target.value)}/>

                <InputText placeholder="Location" type="text" defaultValue={this.props.user.location}
                           disabled={!this.props.edit} style={locationInput} name="location"
                           onChange={(e) => this.props.changeProfileFieldHandler("location", e.target.value)}/>

                {/* In case of Facebook login, password will be undefined and edit button won't be displayed */}
                {this.props.password &&
                <Button className="p-button-warning" label="Edit" style={editBtn}
                        onClick={() => this.props.toggleEditHandler()}/>}

                {this.props.edit &&
                <Button variant="primary" type="submit" label="Submit" style={submitBtn}
                        onClick={() => this.props.updateUserHandler(this.props.user, this.props.username,
                            this.props.password, this.props.location, this.props.picture,
                            onSubmit)}/>}

                <div style={{marginLeft: '25%', marginTop: '25%', width: '80%'}}>
                    <h1 style={{fontFamily: 'sans-serif'}}>My Reviews</h1>
                    <DataView value={this.props.reviews} layout={this.props.layout} header={this.renderHeader()}
                              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true}
                              rows={5} sortOrder={this.props.sortOrder} sortField={this.props.sortField}
                              style={{width: 'max-content'}}/>

                    <Dialog header="Review Details" visible={this.props.visibleReview} width="225px" modal={true}
                            onHide={() => this.props.changeVisibilityMyReview(false)}>
                        {this.renderReviewDialogContent()}
                    </Dialog>

                    <Dialog header="Review" visible={this.props.visibleReview} width="225px" modal={true}
                            onHide={() => this.props.changeVisibilityMyReview(false)}>
                    </Dialog>
                </div>
            </div>
        );
    }

    static renderListItem(review) {
        if (review == null) {
            return null
        }
        return (
            <div>
                <EditReview review={review}/>
            </div>
        );
    }

    renderReviewDialogContent() {
        if (this.props.selectedReview) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img placeholder={'Image'} src={this.props.selectedReview.image}
                             alt={this.props.selectedReview.name} style={{width: '75%'}}/>
                    </div>

                    <div className="p-col-4">Name:</div>
                    <div className="p-col-8">{this.props.selectedReview.name}</div>

                    <div className="p-col-4">Location:</div>
                    <div className="p-col-8">{this.props.selectedReview.location}</div>

                    <div className="p-col-4">Rating:</div>
                    <div className="p-col-8">{this.props.selectedReview.score}</div>
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

    itemTemplate = (review, layout) => {
        return Profile.renderListItem(review);
    }
}

const mapStateToProps = (state) => ({
    user: state.home.get('user'),
    username: state.profile.get('username'),
    password: state.profile.get('password'),
    location: state.profile.get('location'),
    picture: state.profile.get('picture'),
    edit: state.profile.get('edit'),
    reviews: state.profile.get('reviews'),
    visibleReview: state.profile.get('visibleReview'),
    selectedReview: state.profile.get('selectedReview'),
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeLayout: (event) => {
            dispatch(ProfileActions.changeLayout(event.value));
        },
        changeProfileFieldHandler: (field, value) => {
            dispatch(ProfileActions.changeProfileField(field, value))
        },

        toggleEditHandler: (field, value) => {
            dispatch(ProfileActions.toggleEdit(field, value))
        },

        getUserReviews: (userID) => {
            dispatch(ProfileActions.getUserReviews(userID))
        },

        changeVisibilityMyReview: (visible) => {
            dispatch(ProfileActions.changeVisibilityMyReview(visible));
        },

        updateUserHandler: (user, username, password, location, picture, callback) => {
            if (username === undefined) username = user.username;
            if (password === undefined) password = user.password;
            if (location === undefined) location = user.location;
            if (picture === undefined) picture = user.picture;
            let formData = new FormData();
            formData.append('id', user._id);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('location', location);
            formData.append('picture', picture);
            dispatch(ProfileActions.updateUser(formData, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
