import React, { Component } from 'react'
import { ButtonToggle } from 'reactstrap'

import '../../styles/main.css'

class ModuleEditFooter extends Component {

  render = () => {
    return <div className='module-edit-footer'>
        {!this.props.editActive && <ButtonToggle  color="primary" onClick={this.props.toggle} 
                disabled = {(this.props.editActive)? true : false}>
                    Bearbeiten
        </ButtonToggle >}
        {this.props.editActive && <ButtonToggle color="success" onClick={this.props.onSave} 
                disabled = {(!this.props.editActive)? true : false}>
                    Übernehmen
        </ButtonToggle>} {'  '}
        {this.props.editActive && <ButtonToggle color="danger" onClick={this.props.toggle} 
                disabled = {(!this.props.editActive)? true : false}>
                    Abbrechen
        </ButtonToggle>}
    </div>
  }
}
export default ModuleEditFooter
