import React from 'react'
import { ListGroupItem } from 'reactstrap'

    const DetailListItem = ({ data, listItemClickHandler, active }) => (
        <ListGroupItem active={active} tag="button" action onClick={() => listItemClickHandler()}>
            <span>
                <b>
                {(data.caseLastName ? data.caseLastName : '') + ', ' + (data.caseFirstName ? data.caseFirstName : '') + ' [' + (data.mNumber ? data.mNumber : '') + ']'}
                </b>
            </span>
        </ListGroupItem>
    )

    export default DetailListItem



    