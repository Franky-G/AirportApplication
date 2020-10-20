import {Form, FormGroup, Modal, ModalHeader, ModalBody, Input} from "reactstrap";
import React, {Component} from "react";

export default class FileIO extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.state = {
            isOpen: false,
            loadPlaces: null,
            loadTitle: "",
            loadRadius: 0
        }
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
        const callback = (event) => { this.processFiles(event.target.files)}
        const input = <Input onChange = {() => {callback(event); this.setState({isOpen: false})}} type="file" name="file" id="exampleFile"/>
        return (
            <Modal isOpen={this.state.isOpen} toggle={this.openModal}>
                <ModalHeader toggle={this.openModal}>Load a Trip</ModalHeader>
                <ModalBody> <Form> <FormGroup> {input} </FormGroup> </Form> </ModalBody>
            </Modal>
        );
    }

   async processFiles(eventFile) {
        const myFr = new FileReader();
        myFr.addEventListener('load', (event) => {
            eventFile = event.target.result;
        });
        const myPromise = new Blob(eventFile).text();
        await myPromise.then(result => {
           let temp = JSON.parse(result);
           console.log(temp.places)
           this.setState({loadPlaces: temp.places, loadTitle: temp.options.title, loadRadius: temp.options.earthRadius});
       });
        console.log("this is the array: " + this.state.loadPlaces)
       this.props.loadPlaces(this.state.loadPlaces, this.state.loadTitle, this.state.loadRadius)
    }

    openModal(){ this.setState({isOpen: !this.state.isOpen}) }
}