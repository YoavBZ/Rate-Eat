import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

class MapContainer extends React.Component {

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

    render() {
        const style = {
            width: '75%',
            height: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        };
        return (
            <Map
                google={this.props.google} zoom={13}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                style={style}
                onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'}/>

                {/*<InfoWindow onClose={this.onInfoWindowClose}>*/}
                {/*    <div>*/}
                {/*        <h1>{this.state.selectedPlace.name}</h1>*/}
                {/*    </div>*/}
                {/*</InfoWindow>*/}
            </Map>
        );
    }
}

export default GoogleApiWrapper({apiKey: ('AIzaSyCem-Rl28VF5bMKaX7rzQjwJAXy5Pl5ByQ')})(MapContainer)