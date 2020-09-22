import React, {Component} from 'react'
import DetailListItem from './detail.list.item'
import { ListGroup } from 'reactstrap';
import DetailListHeader from './detail.list.header';

class DetailList extends Component {

    render () {
        return (
            <>
                <DetailListHeader onAdd={this.props.onAdd} />
                <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <DetailListItem
                    key={'detail-list-item' + idx}
                    active={this.props.active === idx}
                    data={o}
                    listItemClickHandler={() => this.props.onChange(idx)}
                />)}
                </ListGroup>                
            </>
        )}
}
export default DetailList
