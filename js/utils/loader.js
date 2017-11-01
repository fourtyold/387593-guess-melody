const SERVER_URL = `https://es.dump.academy/guess-melody`;

export default class Loader {

  static downloadData(callback) {
    const requestSettings = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `GET`
    };
    return fetch(`${SERVER_URL}/questions`, requestSettings)
        .then((resp) => resp.json())
        .then((data) => callback(data));
  }

}
