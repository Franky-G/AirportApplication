import React, {Component} from 'react';
import img from "../../../../team/images/tech10.png";
import kylePic from "../../../../team/images/kyle.jpg";
import jakePic from "../../../../team/images/jake.jpg";
import jimitPic from "../../../../team/images/jimit.jpg";
import frankPic from "../../../../team/images/Frank.jpg";

import {Container, Row, Col, Button, Card, CardTitle, CardBody, CardText, CardImg, CardDeck, CardHeader, CardColumns, CardGroup, CardFooter} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";



export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h1 align="center">{CLIENT_TEAM_NAME}</h1>
                <br/><br/>
                <br/>
            </Col>
            <Col id="closeAbout" xs='auto' >
              <Button color="primary" onClick={this.props.closePage} xs={1}>
                Close
              </Button>
            </Col>
              <div>
                  <div>
                      <h2 align="left">Mission Statement:</h2>
                      <img src={img} width = "150" height = "125" align = "left" class = "mr-3"/><h4>Our Mission:</h4><p2>Our Mission is to prepare ourselves as Software Engineers
                          and for future endeavours in Computer Science. We develop and work on a team based
                          integration method with a range of technologies
                          to build applications, and share skills and knowledge with the community. Our motto is
                          "Expect the Unexpected".
                      </p2>

                  </div>
                  <br/>
                  <br/>
                  <div>
                      <h2>Team Infomation:</h2>
                      <CardDeck>

                          <Card border= "secondary" style={{ width: '20rem' }}>
                              <CardImg src = {jimitPic}/>
                              <CardHeader><h4>Jimit Bhalavat</h4></CardHeader>
                              <CardBody>Hello, I'm Jimit! I am currently a junior at Colorado State University majoring in Computer Science and minors in Math and Statistics. My hobbies are to play sports and do community service. I also love the outdoors.</CardBody>
                              <CardFooter className="bg-dark text-white" >jimit@rams.colostate.edu</CardFooter>
                          </Card>
                          <Card>
                              <CardImg src = {kylePic}/>
                              <CardHeader><h4>Kyle Cummings</h4></CardHeader>
                              <CardBody>Hello, my name is Kyle! I am a Junior studying Computer Science at CSU and I plan on continuing in the field far after I graduate. Some of my hobbies include fly fishing and sports! </CardBody>
                              <CardFooter className="bg-dark text-white" >kc7@rams.colostate.edu</CardFooter>

                          </Card>
                          <Card>
                              <CardImg src = {jakePic}/>
                              <CardHeader><h4>Jake Barth</h4></CardHeader>
                              <CardBody>Hey, I'm Jake! I'm a current student at Colorado State University majoring in Computer Science with a minor in Economics. In my free time I enjoy hiking and skiing in the rockies! </CardBody>
                              <CardFooter className="bg-dark text-white" >jakebart@cs.colostate.edu</CardFooter>

                          </Card>
                      </CardDeck>
                      <br/>
                      <CardColumns>
                          <Card>
                              <CardImg src = {frankPic}/>
                              <CardHeader><h4>Frank Gansukh</h4></CardHeader>
                              <CardBody>Hi, my name is Frank Gansukh. I'm an Applied Computing Technology major at Colorado State University with a minor is Business Administration. My hobbies include: playing basketball and skiing.'</CardBody>
                              <CardFooter className="bg-dark text-white" >frankyg@rams.colostate.edu</CardFooter>
                          </Card>
                          <Card>
                              <CardImg src = {img}/>
                              <CardHeader><h4>Sean Munoz</h4></CardHeader>
                              <CardBody>Here is some info about me</CardBody>
                              <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>
                          </Card>
                      </CardColumns>
                  </div>
              </div>
          </Row>
        </Container>
      )
    }
}
