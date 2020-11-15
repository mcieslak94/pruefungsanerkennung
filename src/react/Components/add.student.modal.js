import React, {Component} from 'react' 
import AddWindow from '../Container/addWindow'
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

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
        let anrede = this.state.form.geschlecht==='w' ? 'Frau' : 'Herr'
        data.createDateCase= new Date()
        data.state = 'angelegt'
        data.caseHref ='mailto:' + this.state.form.email + '?subject=Erinnerung:%20Anerkennung%20ihrer%20Prüfungsleistungen%20&body=Hallo%20' + anrede + '%20' + this.state.form.caseLastName + ',%0D%0A%0D%0AAm%20' + data.createDateCase.getDate() + '.' + (data.createDateCase.getMonth()+1) + '.' + data.createDateCase.getFullYear() +  '%20haben%20Sie%20einen%20Antrag%20auf%20Prüfungsleistungen%20bei%20mir%20eingereicht.%20Die%20von%20mir%20angeforderten%20Unterlagen%20haben%20Sie%20mir%20jedoch%20noch%20nicht%20zugesandt.%20Ich%20bitte%20Sie,%20mir%20die%20Dokumente%20schnellstmöglich%20zuzusenden.%0D%0A%0D%0AViele%20Grüße.'
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