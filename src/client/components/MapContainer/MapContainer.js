import React from 'react'
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const style = {
            width: '80%',
            height: '60%',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        return (
            <Map google={this.props.google}
                 zoom={13}
                 initialCenter={this.props.position}
                 onClick={this.onMapClicked}
                 style={style}>
                <Marker
                    name={this.props.name}
                    position={this.props.position}
                    onClick={this.onMarkerClick}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}>
                    <b>{this.state.selectedPlace.name}</b>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({apiKey: ('AIzaSyCem-Rl28VF5bMKaX7rzQjwJAXy5Pl5ByQ')})(MapContainer)