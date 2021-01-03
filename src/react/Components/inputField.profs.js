import React, {Component} from 'react'
import { Input } from 'reactstrap'

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
           <Input invalid={this.props.profError} disabled={this.props.disabled} type={'select'} value={this.props.value} placeholder='Professor wählen...' onChange={e => this.props.onChange(e.target.value)}>
               {this.state.profs && this.state.profs.length > 0 && this.state.profs.map(c => <option key={'profs-option-' + c.professorID} value={c.professorID}>{c.titel} {' '} {c.profName}</option>)}
           </Input>  
        )}
}
export default ProfsInput
