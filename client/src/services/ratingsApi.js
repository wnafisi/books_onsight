const BASE_URL = process.env.REACT_APP_API_URL;

export function fetchRatingForBook(id) {
    console.log("fetchRatingForBook", id)
    return fetch(BASE_URL + `/ratings/${id}`)
    .then(resp=>resp.json())
}

export function fetchSpecificRating(ratingNum) {
    return fetch (BASE_URL + `/stars/${ratingNum}`)
    .then(resp=>resp.json())
}

export function saveRating(book_id, user_id, rating, comment, jwt) {
    const body = {"book_id": book_id, "user_id": user_id, "rating": rating, "comment": comment}
    const init = {
        headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body)
    }
    console.log("init", init);
    return fetch(BASE_URL + `/ratings`, init)
        .then(resp => resp.json());
}


export function fetchUserRatings(userId) {
    return fetch (BASE_URL + `/userratings/${userId}`)
    .then(resp=>resp.json())
}

export function updateR(editedRating, id, jwt) {
    console.log(editedRating, id, jwt)
    const init = {
        headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(editedRating)
    }
    return fetch(BASE_URL + `/ratings/${id}`, init)
        .then(resp => resp.json());
}

export function destroy(id, jwt) {
    const init = {
        headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'DELETE',
        mode: 'cors'
    }
    return fetch(BASE_URL + `/ratings/${id}`, init)
        .then(resp => resp.json());
}

// export function saveBook(newBook, jwt) {
//     console.log(newBook)
//     const body = newBook
//     const init = {
//       headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
//       method: 'POST',
//       mode: 'cors',
//       body: JSON.stringify(body)
//     }
//     console.log("saveBook api", init)
//     return fetch(`${BASE_URL}/books`, init)
//         .then(resp => resp.json());
// }