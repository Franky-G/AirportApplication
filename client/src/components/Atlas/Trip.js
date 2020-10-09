import React, {Component} from "react";
import {
    Row,
    InputGroup,
    InputGroupAddon,
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover,
    Button,
} from "reactstrap";
import Input from "@material-ui/core/Input";

const labelStyle = {opacity: 0.2, overflow:"hidden"}
const inputArray = [{width: 211, label: "Add Place", width2: 70}, {width: 229, label: "Filter", width2: 50}]

export default class SearchModule extends Component {

    constructor(props) {
        super(props);

        this.divclicked = this.divclicked.bind(this);
        this.state = {
            myclass: '',
            searchPlaces: "",
            filter: "",
        }
    }

    render(){
        return(
            <div>
                {this.renderTripUI()}
            </div>
        );
    }

    addInputField(array){
        return(
            <div>
                <InputGroup>
                    <Input className="justify-content-center" style={{backgroundColor: "#FFFFFF", width: array.width, borderRadius: "3px 0 0 3px", border: "1px solid #FFFFFF", left: 27, height: 30, boxShadow: "1px 1px 1px 0 #000000", overflow: "hidden"}} />
                    <InputGroupAddon addonType="append"><Button style={{ background: "linear-gradient(#1E4D2B, #002b0c)", padding: 2, color: "#FFFFFF", borderRadius: "0 3px 3px 0", border: "1px solid #FFFFFF", left: 27, fontSize: 11, width: array.width2, boxShadow: "1px 1px 1px 0 #000000", overflow:"hidden"}} title="Add location">{array.label}</Button></InputGroupAddon>
                </InputGroup>
            </div>
        );
    }

    addASpace(){
        return(
            <Row style={{height:5}}/>
        );
    }

    divclicked() {
        if (this.state.myclass === '') {
            this.setState({
                myclass: 'coolclass'
            })
        } else {
            this.setState({
                myclass: '',
            })
        }
    }

    handleTripInputs(){
        const input = event.target;
        if (input.name === "searchPlaces"){this.setState({searchWhereIsTextFrom: input.value});}
        if (input.name === "filter"){this.setState({searchWhereIsTextTo: input.value});}
    }

    renderPopover(){
        return(
            <div>
                <Button id="UncontrolledPopover"
                        style={{position: "absolute", margin: 0, padding: 0, color: "#1E4D2B", backgroundColor: "#C8C372",
                            width: 30, height: 30, borderRadius: 30, left:10, top: 13, border: "2px ridge #1E4D2B"}}>
                    ?
                </Button>
                <UncontrolledPopover trigger="focus" placement="bottom" target="UncontrolledPopover" offset="125">
                    <PopoverHeader>How To Use</PopoverHeader>
                    <PopoverBody style={{maxWidth: 300}}>
                        <p>
                            Create a trip!<br/>
                            - Toggle the trip manager on/off from the dropdown button to start recording places via mouse clicks, or input coordinates / locations in the search bar and add place<br/><br/>
                            - Manage places with add or remove buttons <br/><br/>
                            - Manage trips with add or remove buttons <br/><br/>
                            - Filter results at the bottom
                        </p>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }

    renderPlacesAndTrips(){
        return(
            <div>
                <Row id="placePanel" className="justify-content-center">
                    <div className="tripBackdrop" style={{width:280, height:175, fontSize: 40}} ><label style={labelStyle} className="vertical-center justify-content-center" >Places</label></div>
                </Row>
                <Row style={{height: 5}}/>
                <Row id={"savedTripsPanel"} className="justify-content-center">
                    <div className="tripBackdrop" style={{width:280, height: 90, fontSize: 40}}><label style={labelStyle} className="vertical-center justify-content-center">Saved Trips</label></div>

                </Row>
            </div>
        );
    }

    renderTripUI(){
        return(
            <div id="tripDiv" className={this.state.myclass} >
                <Row style={{height:5}}/>
                <div className="vertical-center justify-content-center" style={{position: "absolute",  top: 16, left: 262, height: 25, width: 25, borderRadius: "3px 3px 3px 3px", backgroundColor:"#C8C372", fontSize: 20, border: "1px ridge #1E4D2B", color: "#1E4D2B", cursor: "pointer"}}
                     onClick={() => this.divclicked()}>X</div>
                <Row className="justify-content-center">
                    <h4 style={{background: "linear-gradient(#1E4D2B, #002b0c)", padding: 4, left: 50,
                        border:"2px ridge #FFFFFF", borderRadius: "3px 3px 3px 3px", boxShadow: "1px 2px 1px 0 #000000", overflow:"hidden"}}>Trip Designer</h4>
                </Row>
                <Row style={{height:15}}/>
                <div style={{position: "relative", left: -17}}>
                    {this.addInputField(inputArray[0])}
                </div>
                {this.addASpace()}
                    {this.renderPlacesAndTrips()}
                {this.addASpace()}
                <Row style={{top:5}}>
                    {this.addInputField(inputArray[1])}
                </Row>
            </div>
        );
    }
}