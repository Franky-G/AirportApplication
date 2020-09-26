import React, {Component} from 'react';
import img from "../../../../team/images/tech10.png";
import kylePic from "../../../../team/images/kyle.jpg";
import jakePic from "../../../../team/images/jake.jpg";
import jimitPic from "../../../../team/images/jimit.jpg";
import frankPic from "../../../../team/images/Frank.jpg";
import seanPic from "../../../../team/images/SM_cropped.jpg";
import {Container, Row, Col, Button, Card, CardBody, CardImg, CardHeader, CardFooter} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../../utils/constants";

const cardStyle = {
    maxWidth: 485,
}

let aboutList = [
    {pic: img, name: "Welcome to our page!", bio: "Our Mission is to prepare ourselves as Software Engineers and for future endeavours in Computer Science. We develop and work on a team base integration method with a range of technologies to build applications, and share skills and knowledge with the community.", info: "Expect the unexpected"},
    {pic: jakePic, name: "Jake Barth", bio: "Hey, I'm Jake! I'm a current student at Colorado State University majoring in Computer Science with a minor in Economics. In my free time I enjoy hiking and skiing in the rockies!", info: "jakebart@cs.colostate.edu"},
    {pic: jimitPic, name: "Jimit Bhalavat", bio: "Hello, I'm Jimit! I am currently a junior at Colorado State University majoring in Computer Science and minors in Math and Statistics. My hobbies are to play sports and do community service. I also love the outdoors.", info: "jimit@rams.colostate.edu"},
    {pic: kylePic, name: "Kyle Cummings", bio: "Hello, my name is Kyle! I am a Junior studying Computer Science at CSU and I plan on continuing in the field far after I graduate. Some of my hobbies include fly fishing and sports!", info: "kc7@rams.colostate.edu"},
    {pic: frankPic, name: "Frank Gansukh", bio: "Hi, my name is Frank Gansukh. I'm an Applied Computing Technology major at Colorado State University with a minor in Business Administration. My hobbies include: playing basketball and skiing.", info: "frankyg@rams.colostate.edu"},
    {pic: seanPic, name: "Sean Munoz", bio: "Hey there, my name is Sean Munoz. I'm a junior studying Computer Science at Colorado State University. Some of my hobbies include music production, downhill skiing, and competitive esports.", info: "smunoz@rams.colostate.edu"}]

const names = ['Team Info', 'Jake Barth', 'Jimit Bhalavat', 'Kyle Cummings', 'Frank Gansukh', 'Sean Munoz'];

export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
        };
    }

    render() {
        return (
            <Container id="about">
                <Row><Col><h1 align="center">{CLIENT_TEAM_NAME}</h1></Col>
                    <Col id="closeAbout" xs='auto' ><Button style={{backgroundColor: '#1E4D2B', borderColor: '#1E4D2B'}} onClick={this.props.closePage} xs={1}>Close</Button></Col>
                </Row>
                <Row>
                    {this.renderButtons()}
                    <Col className="col-auto justify-content-center">
                        {this.getCard(this.state.activeTab)}
                    </Col>
                </Row>
            </Container>
        )
    }

    getCard(index) {
        return (
            <Card style={cardStyle}>
                <CardImg src={aboutList[index].pic} />
                <CardHeader><h4>{aboutList[index].name}</h4></CardHeader>
                <CardBody>{aboutList[index].bio}</CardBody>
                <CardFooter className="bg-dark text-white">{aboutList[index].info}</CardFooter>
            </Card>
        )
    }

    renderButtons(){
        return(
            <Col className="col-md-3 aboutTab justify-content-center">
                <Row className="justify-content-center">
                    {this.renderButton()}
                </Row>
            </Col>
        );
    }

    renderButton(){
        const array = []
        for(let i = 0; i < 6; i++){
            array.push(<Button key={i} onClick={() => this.setState({activeTab: i})}> {names[i]} </Button>)
        }
        return array;
    }
}