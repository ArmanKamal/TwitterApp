import React from 'react'

function Message({children}) {
    return (
        <div className="alert alert-danger" role="alert">
           {children}
        </div>
    )
}

export default Message
