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
                {this.props.searchModule && this.renderRadioButtons()}
            </div>
        );
    }

    renderRadioButtons() {
        let radioArray = [{id: "distance", state: () => this.props.switchToDistanceModule()},
            {id: "whereIs", state: () => this.props.switchToWhereIsModule()}]
        return (
            <Container style={{position: "absolute", bottom: 20, left: 31, maxWidth: 260, zIndex: 1016}}>
                <Row className="vertical-center">
                    <CustomInput id="location" style={{marginRight: 0, padding: 0}} defaultChecked type="radio"
                                 name="searchRadioButton" onChange={() => {this.props.switchToLocationModule()}}/>
                    <label style={radioButtonStyle}>Location</label>{this.spacer()}
                    {this.addInputButton(radioArray[0])}
                    <label style={radioButtonStyle}>Distance</label>{this.spacer()}
                    {this.addInputButton(radioArray[1])}
                    <label style={radioButtonStyle}>Where is?</label>{this.spacer()}
                </Row>
            </Container>
        );
    }

    spacer(){return(<div className="px-1"/>);}

    addInputButton(array){
        return(
            <div>
                <CustomInput id={array.id} type="radio" name="searchRadioButton" onChange={array.state}/>
            </div>
        );
    }
}