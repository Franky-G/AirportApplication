import React, {Component} from "react";
import {Button, Col, Input, Row} from "reactstrap";
import Fade from "@material-ui/core/Fade";

export default class SearchModule extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <div>
                {this.props.showWhereIsSearch && this.renderWhereIsModule()}
            </div>
        );
    }

    handleInputChange(){
        const target = event.target;
        if (target.name === "searchWhereIsFrom"){this.setState({searchWhereIsTextFrom: target.value});}
        if (target.name === "searchWhereIsTo"){this.setState({searchWhereIsTextTo: target.value});}
    }

    renderWhereIsModule(){
        return(
            <Fade in={true} timeout={350}>
                <div className="searchModuleStyle" style={{zIndex: 1012}}>
                    <Row xs={2}>
                        <Col><Input name={"searchWhereIsFrom"} style={{margin: 5, width: "100%"}} placeholder="N 47°38' 56.26"
                                    onChange={() => this.handleInputChange()}/></Col>
                        <Col style={{left: -20}}><Input name={"searchWhereIsTo"} style={{margin: 5, width: 160}}
                                                        placeholder="W 122.34811" onChange={() => this.handleInputChange()}/></Col>
                    </Row>
                    <Col style={{left: 283, top: 55}}>
                        <Button className="p-1 distanceButtonStyle" style={{background: "radial-gradient(#C8C372,#1E4D2B)", color: "#000000", border: "1px solid #C8C372", fontSize:12,}}
                                onClick={() => this.props.searchBarCoordsIntermediate(this.state.searchWhereIsTextFrom+','+this.state.searchWhereIsTextTo)} title="Where Is?"> Go To </Button></Col>
                    <p className="searchTypeStyle">
                        Coordinates: ({this.state.searchWhereIsTextFrom},{this.state.searchWhereIsTextTo})<br/>
                        Enter Any Format
                    </p>
                </div>
            </Fade>
        );
    }
}