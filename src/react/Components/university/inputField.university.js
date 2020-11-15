import React, {Component} from 'react'
import { Input } from 'reactstrap'

const electron = window.require('electron')

class UniversityInput extends Component {

    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        this.uniDB = DataBaseConnector('university')
    }

    state= {
        universities: null
    }

    componentDidMount() {
        this.getUnis()
    }

    getUnis = () => {
        this.uniDB.getAll(universities => this.setState({ universities }))
    }
    
    render () {
        return (
            <Input disabled={this.props.disabled} type={'select'} value={this.props.value} placeholder='Hochschule wählen...' onChange={e => this.props.onChange(e.target.value)}>
               {this.state.universities && this.state.universities.length > 0 && this.state.universities.map(c => <option key={'universities-option-' + c.universityID} value={c.universityID}>{c.universityName}</option>)}
           </Input>  
        )}
}
export default UniversityInput
