const BASE_URL = process.env.REACT_APP_API_URL;


export function fetchAuthors() {
    return fetch(BASE_URL + '/authors')
    .then(resp => resp.json())
}

export function fetchOneAuthor(id) {
    return fetch(BASE_URL + `/authors/${id}`)
    .then(resp => resp.json())
}

export function saveAuthor(newAuthor, jwt) {
    console.log(newAuthor)
    const body = newAuthor
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/authors`, init)
        .then(resp => resp.json());
}
