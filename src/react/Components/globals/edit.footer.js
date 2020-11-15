import React, { Component } from 'react'
import { ButtonToggle, Col, Row } from 'reactstrap'
import CloseCaseModal from '../archiv/close.case.modal';

import '../../styles/main.css'

export default class EditFooter extends Component {
  state = {
    closeCaseModalOpen: false
  }

  closeCase = () => {
    this.setState({ closeCaseModalOpen: false })
    this.props.closeCase()
  }

  render = () => {
    return <div className='edit-footer'>
      <Row>
        <Col xs={10}>
        {!this.props.editActive && <ButtonToggle  color="primary" onClick={this.props.toggle} >
                    Bearbeiten
        </ButtonToggle >}
        {this.props.editActive && <ButtonToggle color="success" onClick={this.props.onSave} >
                    Übernehmen
        </ButtonToggle>} {'  '}
        {this.props.editActive && <ButtonToggle color="danger" onClick={this.props.toggle} >
                    Abbrechen
        </ButtonToggle>}
        </Col>
        
        <Col xs={2}>
        {this.props.editActive && <ButtonToggle color="info" onClick={() => this.setState({ closeCaseModalOpen: !this.state.closeCaseModalOpen })} 
                disabled = {(!this.props.editActive)? true : false}>
                    Fall abschließen
        </ButtonToggle>}
        </Col>
      </Row>
      <CloseCaseModal className="close-case-modal"
                open={this.state.closeCaseModalOpen}
                toggle={() => this.setState({ closeCaseModalOpen: !this.state.closeCaseModalOpen })}
                onSubmit={this.closeCase}
      />
    </div>
  }
}
