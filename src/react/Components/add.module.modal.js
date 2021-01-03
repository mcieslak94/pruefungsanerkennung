import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import AddModuleWindow from '../Container/addModuleWindow'

export default class AddModuleModal extends Component {
    state = {
        form: {
            moduleName: '',
            creditPoints: '',
            professorID: '', 
            courseIDs: [],
        }, 
        errors: {
            nameError: false,
            creditError: false,
            courseError: false,
            profError: false,

        }
    }

    handleChange = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let valid = true
        if (!this.state.form.moduleName || (this.state.form.moduleName && this.state.form.moduleName.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, nameError: true } })
            valid = false
        }
        if(!this.state.form.courseIDs || this.state.form.courseIDs.length < 1){
            this.setState({ errors: { ...this.state.form.errors, courseError: true } })
            valid = false
        }
        if(!this.state.form.creditPoints || (this.state.form.creditPoints && this.state.form.creditPoints.length < 1)){
            this.setState({ errors: { ...this.state.form.errors, creditError: true } })
            valid = false
        }
        if(!this.state.form.professorID || (this.state.form.professorID && this.state.form.professorID.length < 1)){
            this.setState({ errors: { ...this.state.form.errors, profError: true } })
            valid = false
        }

        if (valid) {
            let data = this.state.form
            this.props.onSubmit(data)
            this.props.toggle()
            this.setState({ form: {} })
        }
    }

    toggleCourse = (courseID) => {
        if(this.state.form.courseIDs != null){
        if(this.state.form.courseIDs.find(m => m.courseID === courseID)){
            let tempCourse = this.state.form.courseIDs
            var idx =this.state.form.courseIDs.findIndex(m => m.courseID === courseID)
            tempCourse.splice(idx,1)
            this.setState({courseIDs: tempCourse})  
        } else {
            let tempCourse = this.state.form.courseIDs
            const value = {courseID: courseID}
            tempCourse.push(value)
            this.setState({courseIDs: tempCourse})   
        }}
    }

    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Modul hinzufügen</ModalHeader>
                <ModalBody>
                    <AddModuleWindow toggleCourse={this.toggleCourse} onChange={this.handleChange} data={this.state.form} errors={this.state.errors} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}