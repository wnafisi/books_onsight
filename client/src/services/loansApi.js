const BASE_URL = process.env.REACT_APP_API_URL;


export function fetchLoans() {
    return fetch(BASE_URL + '/loans')
    .then(resp => resp.json())
}

export function fetchLoanForBookId(BookId) {
    return fetch(BASE_URL + `/loans/${BookId}`)
    .then(resp => resp.json())
}

export function fetchLoanForUserId(userId) {
    return fetch(BASE_URL + `/userloans/${userId}`)
    .then(resp => resp.json())
}

export function fetchBookForLoan(userId) {
    return fetch(BASE_URL + `/book_loans/${userId}`)
    .then(resp => resp.json())
}

export function saveLoan(newLoan, jwt){
    const body = newLoan
    const init = {
        headers: {"Authorization": `Bearer ${jwt}`,'Content-Type': 'application/json', 'Accept': 'application/json'},
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(body)
      }
      console.log("saveloan api", init)
      return fetch(`${BASE_URL}/loans`, init)
          .then(resp => resp.json());
}

