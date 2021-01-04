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
                    placeholder="Suchen"
                    onChange={e => this.props.onSearch(e.target.value)}
                    />
                </FormGroup>
            </Col>
        </Row>
        </> 
    }
}
export default UniversityListHeader
