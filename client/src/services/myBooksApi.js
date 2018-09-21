const BASE_URL = process.env.REACT_APP_API_URL;

export function fetchMyBooksForUserId(userId) {
    return fetch(BASE_URL + `/my_books/${userId}`)
    .then(resp => resp.json())
}

export function saveMyBook(newBook, jwt){
    const body = newBook
    const init = {
        headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body)
      }
      console.log("saveMyBook", init)
      return fetch(`${BASE_URL}/my_books`, init)
          .then(resp => resp.json());
}
