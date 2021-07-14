import React, { useState,useCallback } from 'react';
import getCookie from '../../csrf_token'
const TweetForm = ({newTweet}) => {
    let csrftoken = getCookie('csrftoken');
    const [content, setContent] = useState('')
    const handleSubmit = (e) =>{
        
        e.preventDefault()
        let content = e.target.elements.content.value;
        // newTweet(content)
        fetch('http://127.0.0.1:8000/api/tweets/create/', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({content:content}),
                })
                .then(response => response.json())
                .then(data => {
                    newTweet(data)
                })
                .catch((error) => {
                console.error('Error:', error);
                });
         
       
    }



    console.log("Form");
    return (
        <form className="form" onSubmit={handleSubmit} method="POST">
            <textarea  className="form-control"  name="content"  placeholder="What's happening?"></textarea>
            <button  className="btn btn-danger my-4" type="submit">Tweet</button>
        </form>
    );
};

export default TweetForm