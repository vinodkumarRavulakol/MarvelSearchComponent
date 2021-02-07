import sha256 from 'crypto-js/sha256';
const marvelURL = 'https://gateway.marvel.com/v1/public/',
// Generate the keys from marvel developers portal
  apiKey = `apikey=YOUR_PUBLIC_KEY`,
  PRIV_KEY = "YOUR_PRIVATE_KEY",
  PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const getMarvelCharacters = (options) => {
  const {
    name,
    exactMatch,
  } = Object.assign({
    name: '',
    exactMatch: false,
  }, options);

  let ts = new Date().getTime();
  let hash = sha256(ts + PRIV_KEY + PUBLIC_KEY);

  let url =
    `${marvelURL}characters?${apiKey}`;
  if (name) {
    if (exactMatch) { url += `&name=${name}`; }
    else { url += `&nameStartsWith=${name}`; }
  }
  return fetch(url, { ts: ts, hash: hash })
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          return {
            characters: resObj.data.results
          };
        } else {
          throw new Error(`API Bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
}

export {
  getMarvelCharacters,
};
