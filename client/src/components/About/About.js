import React, {Component} from 'react';
import img from "../../../../team/images/tech10.png";
import kylePic from "../../../../team/images/kyle.jpg";
import jakePic from "../../../../team/images/jake.jpg";
import jimitPic from "../../../../team/images/jimit.jpg";
import frankPic from "../../../../team/images/Frank.jpg";
import seanPic from "../../../../team/images/SM_cropped.jpg";


import { Media, Container, Row, Col, Button, Card, CardBody, CardImg, CardDeck, CardHeader, CardColumns, CardFooter} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

const imgStyle = {
    maxHeight: 200,
    maxWidth: 200,
}
const bodyStyle = {
    marginLeft: 10
}
let teamList = [{pic: jimitPic, name: "Jimit Bhalavat", bio: "Hello, I'm Jimit! I am currently a junior at Colorado State University majoring in Computer Science and minors in Math and Statistics. My hobbies are to play sports and do community service. I also love the outdoors.", info: "jimit@rams.colostate.edu"},
    {pic: kylePic, name: "Kyle Cummings", bio: "Hello, my name is Kyle! I am a Junior studying Computer Science at CSU and I plan on continuing in the field far after I graduate. Some of my hobbies include fly fishing and sports!", info: "kc7@rams.colostate.edu"},
    {pic: jakePic, name: "Jake Barth", bio: "Hey, I'm Jake! I'm a current student at Colorado State University majoring in Computer Science with a minor in Economics. In my free time I enjoy hiking and skiing in the rockies!", info: "jakebart@cs.colostate.edu"}]
let teamList2 =[{pic: frankPic, name: "Frank Gansukh", bio: "Hi, my name is Frank Gansukh. I'm an Applied Computing Technology major at Colorado State University with a minor in Business Administration. My hobbies include: playing basketball and skiing.", info: "frankyg@rams.colostate.edu"},
    {pic: seanPic, name: "Sean Munoz", bio: "Hey there, my name is Sean Munoz. I'm a junior studying Computer Science at Colorado State University. Some of my hobbies include music production, downhill skiing, and competitive esports.", info: "smunoz@rams.colostate.edu"}]

export default class About extends Component {

    render() {
      return (
        <Container id="about"><Row><Col><h1 align="center">{CLIENT_TEAM_NAME}</h1><br/><br/><br/></Col>
            <Col id="closeAbout" xs='auto' ><Button color="primary" onClick={this.props.closePage} xs={1}>Close</Button></Col>
              <div><h2 align ="left">Mission Statement:</h2><Media><Media left href="#"><Media object src={img} style={imgStyle} alt="Team Logo"/></Media>
                      <Media body style={bodyStyle}>
                          <Media heading>Our Mission:</Media>
                          Our Mission is to prepare ourselves as Software Engineers and for future endeavours in Computer Science. We develop and work on a team based
                          integration method with a range of technologies to build applications, and share skills and knowledge with the community. Our motto is
                          "Expect the Unexpected".</Media></Media></div><br/>
                  <div><h2>Team Information:</h2>
                      <CardDeck>{teamList.map(this.getCard)}</CardDeck><br/>
                      <CardColumns>{teamList2.map(this.getCard)}</CardColumns>
                  </div></Row></Container>
      )
    }

    getCard(member) {
        return (
            <Card>
                <CardImg src = {member.pic} />
                <CardHeader><h4>{member.name}</h4></CardHeader>
                <CardBody>{member.bio}</CardBody>
                <CardFooter className = "bg-dark text-white">{member.info}</CardFooter>
            </Card>
        )
    }
}
