export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch({
            type:"USER_LOGIN_REQUEST"
        })

        let endpoint = 'http://127.0.0.1:8000/api/users/login/'
     
        const response = await fetch(endpoint, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username':email,
                'password':password
            }) 
          });
          const data = await response.json()
           
          dispatch({
                type:"USER_LOGIN_SUCCESS",
                payload:data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        }

        catch(error){
            dispatch({
                type: "USER_LOGIN_FAIL",
                payload: error.response && error.response.data.message
                ?error.response.data.message
                :error.message.detail
            })
        }
        
}

export const logout = () =>(dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: "USER_LOGOUT"
    })
}
