const BASE_URL = process.env.REACT_APP_API_URL;

export function fetchUsers() {    
    return fetch(BASE_URL + '/users')
    .then(resp=>resp.json())
}

  export function registerUser(email, password) {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const url = `${BASE_URL}/users`
    const body = {"user": {"email": email, "password": password}}
    const init = { method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                   mode: 'cors',
                   body:JSON.stringify(body)
                 }
    console.log("registerUserApi", init)
    return fetch(url, init)
   .then(res => res.json())
   .catch(err => console.log(err))
   
  }


