import React, { Component } from "react";
import { Container, Button } from "reactstrap";

import ServerSettings from "./ServerSettings";
import isConnectedIcon from "../../static/images/FooterIcon_3D_30pix.png";
import notConnectedIcon from "../../static/images/FooterIcon_3D_red.png";

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
                        <img className="vertical-center" src={linkStatusSymbol} alt="Connection Status"/>
                        <div className="footerSpacer"/>
                        <div className="tco-text">
                            Connected to { serverName } &nbsp;
                        </div>
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            <Button style={{background: "radial-gradient(#C8C372, #1E4D2B)", color: "#000000", border: "2px solid #C8C372"}}>Server Info</Button>
                        </a>
                        {this.renderServerSettings()}
                    </div>
                </Container>
            </div>
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
