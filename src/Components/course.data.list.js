import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class CourseBaseDataList extends Component {

    render () {
        return (
            <>
            <ListGroup >
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => 
                <ListGroupItem  key={'course-base-date-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                    <span>{(o.courseName ? o.courseName : '')}</span>
                </ListGroupItem>)}
            </ListGroup>
            </>
        )}
}

export default CourseBaseDataList 

