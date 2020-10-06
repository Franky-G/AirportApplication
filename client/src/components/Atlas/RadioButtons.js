import React, {Component} from "react";
import {Container, CustomInput, Row} from "reactstrap";

const radioButtonStyle = {margin: 0, color: "#FFFFFF", zIndex: 1015, fontSize:13, textAlign: "center"}

export default class SearchModule extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <div>
                {this.props.coreModule && this.renderRadioButtons()}
            </div>
        );
    }

    renderRadioButtons() {
        return (
            <Container style={{position: "absolute", bottom: 20, left: 31, maxWidth: 260, zIndex: 1016}}>
                <Row className="vertical-center">
                    <CustomInput id="location" style={{marginRight: 0, padding: 0}} defaultChecked type="radio" name="searchRadioButton" onChange={() => {this.props.switchToLocationModule()}}/>
                    <label style={radioButtonStyle}>Location</label>{this.spacer()}
                    <CustomInput id="distance" type="radio" name="searchRadioButton" onChange={() => {this.props.switchToDistanceModule()}}/>
                    <label style={radioButtonStyle}>Distance</label>{this.spacer()}
                    <CustomInput id="whereIs" type="radio" name="searchRadioButton" onChange={() => {this.props.switchToWhereIsModule()}}/>
                    <label style={radioButtonStyle}>Where is?</label>{this.spacer()}
                </Row>
            </Container>
        );
    }

    spacer(){return(<div className="px-1"/>);}
}