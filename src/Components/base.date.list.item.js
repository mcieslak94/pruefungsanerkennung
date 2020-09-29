import React from 'react'

    const BaseDateListItem = ({ data, listItemClickHandler, active }) => (
        <BaseDateListItem active={active} tag="button" action onClick={() => listItemClickHandler()}>
            <span><b>{(data.caseFirstName ? data.caseFirstName : '') + ' ' + (data.caseLastName ? data.caseLastName : '')}</b></span>
        </BaseDateListItem>
    )

    export default BaseDateListItem