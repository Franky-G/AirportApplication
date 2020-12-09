import React, {Component} from "react";
import {Button, Col, Input, Row} from "reactstrap";
import Fade from "@material-ui/core/Fade";

const inputStyle = [{margin: 5, width: "100%"}, {margin: 5, width: 160}]
const fromToStyle = [{name: "searchWhereIsFrom", style: inputStyle[0], placeholder: "N 47°38' 56.26"},
                     {name:"searchWhereIsTo", style:inputStyle[1], placeholder:"W 122.34811"}]

export default class SearchModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

    render(){
        return(
            <div>
                {this.props.showWhereIsSearch && this.renderWhereIsPanel()}
            </div>
        );
    }

    InputChange(){
        if (event.target.name === "searchWhereIsFrom"){this.setState({searchWhereIsTextFrom: event.target.value});}
        if (event.target.name === "searchWhereIsTo"){this.setState({searchWhereIsTextTo: event.target.value});}
    }

    renderInputFromTo(index){
        return(
            <Input name={fromToStyle[index].name} style={fromToStyle[index].style}
                   placeholder={fromToStyle[index].placeholder} onChange={() => this.InputChange()}/>
        );
    }

    renderWhereIsPanel(){
        return(
            <Fade in={true} timeout={350}>
                <div className="searchModuleStyle" style={{zIndex: 1012}}>
                    <Row xs={2}>
                        <Col>
                            {this.renderInputFromTo(0)}
                        </Col>
                        <Col style={{left: -20}}>
                            {this.renderInputFromTo(1)}
                        </Col>
                    </Row>
                    <Col style={{left: 283, top: 55}}>
                        <Button className="p-1 distanceButtonStyle" style={{background: "radial-gradient(#C8C372,#1E4D2B)",
                            color: "#000000", border: "1px solid #C8C372", fontSize:12,}}
                                onClick={() => this.props.searchBarCoordsIntermediate(this.state.searchWhereIsTextFrom +
                                    ','+this.state.searchWhereIsTextTo)} title="Where Is?"> Go To </Button></Col>
                    <p className="searchTypeStyle">
                        <br/>
                        Enter Any Format
                    </p>
                </div>
            </Fade>
        );
    }

     fetchAddressData(lat, lng){
        fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${lng},${lat}`)
            .then(res => res.json())
            .then(myJson => {
                this.setState({address : myJson.address.LongLabel})
            })

    }
}