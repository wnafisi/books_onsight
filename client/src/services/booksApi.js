const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL);


export function fetchBooks() {
    return fetch(BASE_URL + '/books')
    .then(resp => resp.json())
}

export function fetchOneBook(id) {
    return fetch(BASE_URL + `/books/${id}`)
    .then(resp => resp.json())
}

export function saveBook(newBook, jwt) {
    console.log(newBook)
    const body = newBook
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    console.log("saveBook api", init)
    return fetch(`${BASE_URL}/books`, init)
        .then(resp => resp.json());
}

export function updateBook(editedBook, id) {
    console.log(editedBook, id)
    const opts = {
        method: 'PUT',
        body: JSON.stringify(editedBook),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(BASE_URL + `/books/${id}`, opts)
        .then(resp => resp.json());
}

export function destroy(id) {
    const opts = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(BASE_URL + `/books/${id}`, opts)
        .then(resp => resp.json());
}