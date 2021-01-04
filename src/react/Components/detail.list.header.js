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
                    placeholder="Suchen"
                    onChange={e => this.props.onSearch(e.target.value)}
                    />
                </FormGroup>
            </Col>
            <Col style={{paddingLeft: '0px'}} xs={2}><Button color="success" onClick={this.props.onAdd}>+</Button></Col>
        </Row>
        </> 
    }
}
export default DetailListHeader
