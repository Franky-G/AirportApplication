import Button, {Form, FormGroup, Label, Modal, ModalHeader, ModalBody, Input} from "reactstrap";
import React, {Component} from "react";

export default class FileIO extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.state = {isOpen: false}
    }

    render(){ return( <div> {this.openLoadModal()} </div> ); }

    downloadFile(fileText, fileName, fileType) {
        let file = new Blob([fileText], {type: fileType});
        let a = document.createElement('a');
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    openLoadModal() {
        return (
            <Modal isOpen={this.state.isOpen} toggle={this.openModal}>
                <ModalHeader toggle={this.openModal}>Load a Trip</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleFile">Load</Label>
                            <Input type="file" name="file" id="exampleFile"/>
                        </FormGroup>
                        {/*<Button>Submit</Button>*/}
                    </Form>
                </ModalBody>
            </Modal>
        );
    }

    openModal(){this.setState({isOpen: !this.state.isOpen})}
}