import React, {Component} from 'react'
import DetailListItem from './detail.list.item'
import { ListGroup } from 'reactstrap';
import DetailListHeader from './detail.list.header';
import List from 'devextreme-react/list';

function ItemTemplate(data) {
    return <div>{(data.caseLastName ? data.caseLastName : '') + ', ' + (data.caseFirstName ? data.caseFirstName : '')}</div>;
  }

class DetailList extends Component {
    constructor() {
        super();
        this.state = { 
          searchMode: 'contains'
        };
      }

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
                    <React.Fragment>
                        <div className="list-container">
                        <List
                            dataSource={this.props.data}
                            height={400}
                            itemRender={ItemTemplate}
                            searchExpr={"caseLastName"}
                            searchEnabled={true}
                            searchMode={this.state.searchMode} />
                        </div>
                    </React.Fragment>
            </>
        )}
}
export default DetailList
