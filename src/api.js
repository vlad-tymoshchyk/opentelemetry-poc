const baseUrl = 'https://jsonplaceholder.typicode.com';
const TIMEOUT = 1000;

const endpoints = {
  users: `${baseUrl}/users`,
};

export async function getSessionId() {
  return new Promise((resolve) =>
    setTimeout(
      resolve,
      TIMEOUT,
      fetch(`${endpoints.users}/1`)
        .then((response) => response.json())
        .then((user) => user.phone)
    )
  );
}

export async function submit(store) {
  return new Promise((resolve) =>
    setTimeout(
      resolve,
      TIMEOUT,
      fetch(`${endpoints.users}/2?username=${store.username}`)
        .then((response) => response.json())
        .then((user) => user.address.zipcode)
    )
  );
}
