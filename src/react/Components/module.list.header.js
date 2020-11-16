import React, {Component} from 'react'
import { Row, Col, Button, FormGroup, Input } from 'reactstrap';

class ModuleListHeader extends Component {

    render () {
        return <>
        <Row>
        </Row>
        <Row>
            <Col xs={10}>
                <FormGroup>
                    <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search placeholder"
                    onChange={e => this.props.onSearch(e.target.value)}
                    />
                </FormGroup>
            </Col>
            <Col style={{paddingLeft: '0px'}} xs={2}><Button color="success" onClick={this.props.onAdd}>+</Button></Col>
        </Row>
        </> 
    }
}
export default ModuleListHeader
