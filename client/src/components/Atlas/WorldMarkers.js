import React, {Component} from "react";
import {Marker, Polyline, Popup} from "react-leaflet";
import homeMarker from "../../static/images/youAreHereMarker.png";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const HOME_MARKER = L.icon({ iconUrl: homeMarker, shadowUrl: iconShadow, shadowAnchor: [12, 41], iconAnchor: [32, 55], iconSize: [60, 65]});

export default class WorldMarkers extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                {this.getHomeMarker()}
                {this.getMarker()}
                {this.props.whereIsMarker && this.renderWhereIsMarker()}
                {this.makePolyline()}
            </div>
        );
    }

    addAMarker(markerType){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        let positionMarker = MAP_CENTER_DEFAULT;
        if(markerType === 0 || markerType === 1){ positionMarker = this.props.prevLocation[markerType]}
        return(
            <div>
                <Marker key={markerType} ref={initMarker} position={positionMarker} icon={MARKER_ICON}/>
            </div>
        );
    }

    getHomeMarker(){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        if (this.props.homeLocation){
            return (
                <Marker ref={initMarker} position={this.props.homeLocation} icon={HOME_MARKER}/>
            )
        }
    }

    getMarker() {
        let markerSet = [];
        for (let i = 0; i < 2; ++i) {
            if (this.props.prevLocation[i] !== null) { markerSet.push(this.addAMarker(i)); }
        }
        return ( <div>{markerSet.map((element, index) => (<div key={index}>{element}</div>))} </div> );
    }

    renderWhereIsMarker(){
        const initMarker = ref => { if (ref) { ref.leafletElement.openPopup() } };
        return (
            <Marker ref={initMarker} position={this.props.whereIsMarker} icon={MARKER_ICON}/>
        );
    }

    makePolyline(){
        let array = [];
        for(let i = 0; i < this.props.atlasTripPlaces.length; ++i){
            array.push(this.props.atlasTripPlaces[i][0])
        }
        if(array[0] !== null && array[1] !== null && this.props.prevLocation[0] !== null && this.props.prevLocation[1] !== null) {
            return (
                this.renderPolyline(array)
            );
        }
        if(array[0] !== null && array[1] !== null){
            return(
                <div><Polyline color="green" positions={array}/></div>
            );
        }
    }

    renderPolyline(array){
        const initMarker = ref => {if (ref) {ref.leafletElement.openPopup()}}
        return(
            <div>
                <Polyline color="green" positions={array}/>
                <Polyline ref={initMarker} color="green" positions={this.props.prevLocation} >
                    <Popup autoPan={false} className="popupStyle">
                        Distance: {this.props.polyDistance} M
                    </Popup>
                </Polyline>
            </div>
        );
    }
}
