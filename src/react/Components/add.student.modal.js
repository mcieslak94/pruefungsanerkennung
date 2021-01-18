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
        },
        errors: { 
            firstNameError: false,
            lastNameError: false,
            matrikelError: false,
            emailError: false,
            geschlechtError: false, 
            courseError: false
        }
    }

    handleChange = (prop, e) => {
        let tempForm = this.state.form
        console.log('## e', e)
        if(e.target != null)
            tempForm[prop] = e.target.value
        else
            tempForm[prop] = e
        this.setState({ tempForm })
    }

    handleCourse = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let valid = true
        if (!this.state.form.caseFirstName || (this.state.form.caseFirstName && this.state.form.caseFirstName.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, firstNameError: true } })
            valid = false
        }
        if (!this.state.form.caseLastName || (this.state.form.caseLastName && this.state.form.caseLastName.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, lastNameError: true } })
            valid = false
        }
        if (!this.state.form.mNumber || (this.state.form.mNumber && this.state.form.mNumber.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, matrikelError: true } })
            valid = false
        }
        if (!this.state.form.email || (this.state.form.email && this.state.form.email.length < 1)){
            this.setState({ errors: { ...this.state.form.errors, emailError: true } })
            valid = false
        }
        if (!this.state.form.geschlecht || (this.state.form.geschlecht && this.state.form.geschlecht.length < 1) || !(this.state.form.geschlecht === "m" || this.state.form.geschlecht === "d" || this.state.form.geschlecht === "w" )){
            this.setState({ errors: { ...this.state.form.errors, geschlechtError: true } })
            valid = false
        }
        if (!this.state.form.courseID || (this.state.form.courseID && this.state.form.courseID.length < 1 ) || this.state.form.courseID.length > 10){
            this.setState({ errors: { ...this.state.form.errors, courseError: true } })
            valid = false
        }

        if (valid) {
            let data = this.state.form
            let date = Moment(new Date()).format('YYYY-MM-DD')
            data.createDateCase= date
            data.state = 'angelegt'
            this.props.onSubmit(data)
            this.props.toggle()
            this.setState({ form: {
                caseFirstName: '', 
                caseLastName: '', 
                mNumber: '', 
                email:'',
                geschlecht:'',
                courseID: '' 
            } })
            this.setState({ errors: {
                firstNameError: false,
                lastNameError: false,
                matrikelError: false,
                emailError: false,
                geschlechtError: false,
                courseError: false
            } })
        }
    }

    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Student Eintragen</ModalHeader>
                <ModalBody>
                    <AddWindow errors={this.state.errors} onChange={this.handleChange} data={this.state.form} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}