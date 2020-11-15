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
        } 
    }

    handleChange = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let data = this.state.form
        this.props.onSubmit(data)
        this.props.toggle()
        this.setState({ form: {} })
    }

    toggleCourse = (courseID) => {
        console.log('## courseIDs', this.state.form.courseIDs)
        console.log('## courseID', courseID)
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
                    <AddModuleWindow toggleCourse={this.toggleCourse} onChange={this.handleChange} data={this.state.form} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}