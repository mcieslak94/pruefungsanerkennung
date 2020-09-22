import React from 'react'
import { ListGroupItem } from 'reactstrap'

    const DetailListItem = ({ data, listItemClickHandler, active }) => (
        <ListGroupItem active={active} tag="button" action onClick={() => listItemClickHandler()}>
            <span><b>{(data.caseFirstName ? data.caseFirstName : '') + ' ' + (data.caseLastName ? data.caseLastName : '')}</b></span>
        </ListGroupItem>
    )

    export default DetailListItem