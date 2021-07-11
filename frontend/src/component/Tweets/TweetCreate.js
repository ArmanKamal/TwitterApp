import React,{useRef,useEffect} from 'react'

function TweetCreate() {
    const textAreaRef = useRef('')
    
    const handleSubmit = (e) =>{
        loadTweets(textAreaRef.cuurent.value)
        textAreaRef.cuurent.value = ''
        e.preventDefault()
    }

    function loadTweets(data){
        useEffect(() => {
            fetch('http://127.0.0.1:8000/api/tweets/create/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Success:', data);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
            
        }, [])
    }

    
    return (
            <form className="form" onSubmit={handleSubmit} method="POST">
                <textarea ref={textAreaRef} required={true} className="form-control"  name="tweet" placeholder="What's happening?"></textarea>
                <button className="btn btn-danger my-4" type="submit">Tweet</button>
            </form>
      
    )
}

export default TweetCreate
