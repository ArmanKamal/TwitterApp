import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { tweet_create,listTweet } from '../../actions/TweetAction';
import '../../App.css'
const TweetForm = () => {

    
    const [content, setContent] = useState('')

    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const tweetCreate = useSelector(state => state.TweetCreate)
    const {tweet,success} = tweetCreate

  

    const {error,setError} = useState('')

    useEffect(() => {
        if(success){
            dispatch({type: "TWEET_CREATE_RESET"})
            dispatch(listTweet())
        }
    },[dispatch,success])


    const handleSubmit = (e) =>{
        
        e.preventDefault()

        if(content.length>240){
            setError('Content cannot be more than 240')
        }

        dispatch(
            tweet_create(content,image)
        )
        setContent('')
       
    }




    return (
        <div className="row wrapper">
            {error && <p className="text-danger">{error}</p>}
            <form className="form" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                <div className="col-md-12">
                <textarea  className="form-control" rows="2" cols="10"  onChange={(e) => setContent(e.target.value)} value={content} name="content"  placeholder="What's happening?"></textarea>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button className="btn btn-success my-2" type="submit">Tweet</button>
            </form>
            
        </div>
      
    );

}
export default TweetForm