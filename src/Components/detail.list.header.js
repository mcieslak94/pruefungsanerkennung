import React, {Component} from 'react'
import { Row, Col, Button, FormGroup, Input } from 'reactstrap';

class DetailListHeader extends Component {

    render () {
        return <>
        <Row>
            <Col xs={10} >
                <FormGroup>
                    <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search placeholder"
                    />
                </FormGroup>
            </Col>
            <Col className='no-padding' xs={2}><Button color="success" onClick={this.props.onAdd}>+</Button></Col>
        </Row>
        </> 
    }
}
export default DetailListHeader
