import React from 'react'

const TweetList = ({tweet}) => {
    return (
        <div>
            
            <h2 className="text-success">{tweet.content}</h2>
        </div>
    )
}

export default TweetList
