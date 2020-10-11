import React, {Component} from 'react'
import { Row, Col, FormGroup, Input } from 'reactstrap';

class UniversityListHeader extends Component {

    render () {
        return <>
        <Row>
            <Col xs={12} >
                <FormGroup>
                    <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search placeholder"
                    />
                </FormGroup>
            </Col>
        </Row>
        </> 
    }
}
export default UniversityListHeader
