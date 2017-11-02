
export default class Loader {

  static downloadData(url, callback) {
    const requestSettings = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `GET`
    };
    return fetch(url, requestSettings)
        .then((resp) => resp.json())
        .then((data) => callback(data));
  }

  static downloadResults(url, getHistory, showResult) {
    const requestSettings = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `GET`
    };
    return fetch(url, requestSettings)
        .then((resp) => resp.json())
        .then((data) => getHistory(data))
        .then((history) => showResult(history));
  }

  static uploadResults(url, data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(url, requestSettings);
  }
}
