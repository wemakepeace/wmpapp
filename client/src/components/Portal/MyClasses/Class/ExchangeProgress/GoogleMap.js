import React, { Component } from 'react';
import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';


class GoogleMap extends Component {
    state = {}
    render() {
        return (
            <StaticGoogleMap size="600x600">
                <Marker location="6.4488387,3.5496361" color="blue" label="P" />
            </StaticGoogleMap>
        )
    }
}

export default GoogleMap;

