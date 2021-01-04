import React, {Component} from 'react'
import { Input } from 'reactstrap'
import FormFeedback from 'reactstrap/lib/FormFeedback'

const electron = window.require('electron')

class ProfsInput extends Component {

    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        this.profDB = DataBaseConnector('professor')
    }

    state= {
        profs: null
    }

    componentDidMount() {
        this.getprofs()
    }

    getprofs = () => {
        this.profDB.getAll(profs => this.setState({ profs }))
    }

    render () {
        return (
            <div>
                <Input invalid={this.props.profError} disabled={this.props.disabled} type={'select'} value={this.props.value} placeholder='Professor wählen...' onChange={e => this.props.onChange(e.target.value)}>
                    <option key={'profs-option-' + 0}>{'Bitte einen Professor aussuchen..'}</option>
                    {this.state.profs && this.state.profs.length > 0 && this.state.profs.map(c => <option key={'profs-option-' + c.professorID} value={c.professorID}>{c.titel} {' '} {c.profName}</option>)}
                </Input>  
                <FormFeedback invalid={this.props.profError}>Bitte einen Professor auswählen</FormFeedback>
           </div>
        )}
}
export default ProfsInput
