import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettings from "./ServerSettings";
import isConnectedIcon from "../../static/images/FooterIcon_3D_30pix.png";
import notConnectedIcon from "../../static/images/FooterIcon_3D_red.png";

const UNICODE_INFO_SYMBOL = "\u24D8";
const UNKNOWN_SERVER_NAME = "Unknown";

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {serverSettingsOpen: false};
    }

    render() {
        return (
            <div className="full-width footer">
                {this.renderServerInformation()}
            </div>
        );
    }

    renderServerInformation() {
        const serverName = this.getServerNameFromConnectionStatus();
        const linkStatusSymbol = this.getSymbolFromConnectionStatus();
        return (
            <div className="vertical-center">
                <Container>
                    <div className="vertical-center">
                        <img className="centered" src={linkStatusSymbol} alt="Connection Status"/>
                        <div className="footerSpacer"></div>
                        <div className="tco-text">
                            Connected to { serverName } &nbsp;
                        </div>
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            { UNICODE_INFO_SYMBOL } Info
                        </a>
                        {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
/**
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {linkStatusSymbol} Connected to {serverName} &nbsp;
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            { UNICODE_INFO_SYMBOL } Info
                        </a>
                    {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
 **/
        );
    }

    getSymbolFromConnectionStatus() {
        return this.connectedToValidServer() ? isConnectedIcon : notConnectedIcon;
    }

    getServerNameFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.serverName : UNKNOWN_SERVER_NAME;
    }

    connectedToValidServer() {
        return this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName;
    }

    renderServerSettings() {
        return (
            <ServerSettings
                isOpen={this.state.serverSettingsOpen}
                toggleOpen={(isOpen = !this.state.serverSettingsOpen) => this.setState({serverSettingsOpen: isOpen})}
                serverSettings={this.props.serverSettings}
                processServerConfigSuccess={this.props.processServerConfigSuccess}
            />
        );
    }
}
