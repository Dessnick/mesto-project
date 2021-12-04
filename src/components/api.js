// Токен: 516b48a6-c50b-43c5-aac7-85b1d4cfb698
// Идентификатор группы: plus-cohort-4
//
function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-4/cards', {
    headers: {
      authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}

function getProfile() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-4/users/me', {
    headers: {
      authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}

export { getCards, getProfile };
