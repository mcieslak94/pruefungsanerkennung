import React, {Component} from 'react' 
import AddWindow from '../Container/addWindow'
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import Moment from 'moment'

export default class AddStudentModal extends Component {
    state = {
        form: {
            caseFirstName: '', 
            caseLastName: '', 
            mNumber: '', 
            email:'',
            geschlecht:'',
            courseID: '' 
        } 
    }

    handleChange = (prop, e) => {
        let tempForm = this.state.form
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    handleCourse = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let data = this.state.form
        let date = Moment(new Date()).format('YYYY-MM-DD')
        data.createDateCase= date
        data.state = 'angelegt'
        this.props.onSubmit(data)
        this.props.toggle()
        this.setState({ form: {} })
    }

    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Student Eintragen</ModalHeader>
                <ModalBody>
                    <AddWindow onChange={this.handleChange} data={this.state.form} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}