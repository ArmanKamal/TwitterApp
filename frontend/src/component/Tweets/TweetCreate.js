import React from 'react'

function TweetCreate() {
    return (
        <div className="card card-body">
            <form className="form">
                <textarea className="form-control" placeholder="What's happening?"></textarea>
                <button className="btn btn-success">Tweet</button>
            </form>

        </div>
      
    )
}

export default TweetCreate
