import React, {Component} from 'react'
import EditFooter from './globals/edit.footer';

export default class BaseDateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
        }
    }
        
    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data)
        this.setChangeMode()
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{ paddingBottom: "70px", paddingTop: "40px" }}>
        
    </div> 
    <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
    </>
    : <></>    
}
}