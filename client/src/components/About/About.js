import React, {Component} from 'react';
import img from "/home/crepetown/IdeaProjects/t10/team/images/tech10.png";
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
                  <h2 align = "left">Our Mission:</h2>
                  <p>add mission statement here </p>
                  <h2 align = "left">Team Infomation:</h2>
              <br/>
                  <CardDeck>
                      <Card border= "secondary" style={{ width: '20rem' }}>
                          <CardImg src = {img}/>
                          <CardHeader><h4>Jimit Bhalavat</h4></CardHeader>
                          <CardBody>Here is some info about me</CardBody>
                          <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>
                      </Card>
                      <Card>
                          <CardImg src = {img}/>
                          <CardHeader><h4>Kyle Cummings</h4></CardHeader>
                          <CardBody>Here is some info about me</CardBody>
                          <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>

                      </Card>
                      <Card>
                          <CardImg src = {img}/>
                          <CardHeader><h4>Jake Barth</h4></CardHeader>
                          <CardBody>Here is some info about me</CardBody>
                          <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>
                      </Card>
                  </CardDeck>
              <br/>
                  <CardColumns>
                      <Card>
                          <CardImg src = {img}/>
                          <CardHeader><h4>Frank Gansukh</h4></CardHeader>
                          <CardBody>Here is some info about me</CardBody>
                          <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>
                      </Card>
                      <Card>
                          <CardImg src = {img}/>
                          <CardHeader><h4>Sean Munoz</h4></CardHeader>
                          <CardBody>Here is some info about me</CardBody>
                          <CardFooter className="bg-dark text-white" >Insert Email Here</CardFooter>
                      </Card>
                  </CardColumns>
              </div>
          </Row>
        </Container>
      )
    }
}
