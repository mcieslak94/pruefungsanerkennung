import React,  { Component } from 'react'
import '../../styles/modal.css'
import { Button, Row, Col, Container } from 'reactstrap'

export default class Modal extends Component {
    
    handleOk = e => {
        this.props.onOk(e)
        this.props.onClose()
    } 

    render = () => {
        return this.props.visible
            ? <div className='mc-modal-container'>
            <div className='mc-modal-backdrop' onClick={() => this.props.onClose()}/>
            <div className='mc-modal-dialog'>
                <div className='mc-modal-header'>
                    <Container>
                        <Row>
                            <Col xs={10}>{this.props.title}</Col>
                            <Col className='no-padding' xs={2}><Button style={{float: 'right'}} onClick={() => this.props.onClose()}>x</Button></Col>
                        </Row>
                    </Container>
                </div>
                <div className='mc-modal-content'>
                    {this.props.children}
                </div>
                <div className='mc-modal-footer'>
                        <Button style={{ float: 'right', marginLeft: 8, marginRight: 8 }} onClick={() => this.props.onClose()}>Abbrechen</Button>
                        <Button style={{ float: 'right'}} onClick={this.handleOk}>Ok</Button>
                </div>
            </div>
        </div>
        : <></>
    }
}

Modal.defaultProps = {
    visible: false,
    title: 'No Title defined',
    onClose: () => console.warn('Modal onClose is not defined'),
    onOk: () => console.warn('Modal onOk is not defined'),
    onCancel: () => console.warn('Modal onCancel is not defined')
}