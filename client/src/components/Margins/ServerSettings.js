import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ResponseConfig";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: {}
        };
        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings(this.getCurrentServerName())}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderSettings(currentServerName) {
        let serverInfo = [{listName: "Name:", info: currentServerName}, {listName: "URL:", info: this.renderInputField()}]
        let ConfigInfo = [{configName: "Request Type:", extra: this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.requestType},
            {configName: "Request Version:", extra: this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.requestVersion},
            {configName: "Server Name:", extra: currentServerName},
            {configName: "Supported Requests:", extra: (this.props.serverSettings.serverConfig && JSON.stringify(this.props.serverSettings.serverConfig.supportedRequests))}]
        return (
            <ModalBody>
                {serverInfo.map(this.getServerInfo)}
                <br/><h5>Server Configuration Information</h5><br/>
                {ConfigInfo.map(this.getServerConfigInfo)}
            </ModalBody>
        );
    }

    getServerInfo(info) {
        return (
            <Row className="m-2">
                <Col xs={2}>
                    <b><em>{info.listName}</em></b>
                </Col>
                <Col xs={10}>
                    {info.info}
                </Col>
            </Row>
        )
    }

    getServerConfigInfo(ser) {
        return (
            <Row className="m-2">
                <Col xs={6}>
                    <b><em>{ser.configName}</em></b>
                </Col>
                <Col xs={25}>
                    {ser.extra}
                </Col>
            </Row>
        )
    }

    renderInputField() {
        let valid = this.state.validServer === null ? false : this.state.validServer;
        let notValid = this.state.validServer === null ? false : !this.state.validServer;
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={valid}
                   invalid={notValid}
            />
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest({requestType: "config", requestVersion: 1}, value)
                    .then(config => {
                        if (config) { this.processConfigResponse(config.data) }
                        else { this.setState({validServer: true, config: config}); }
                    });
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: config});
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
