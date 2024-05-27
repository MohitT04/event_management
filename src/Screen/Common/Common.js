const apiServerUrl = "http://localhost:5146/api/";

function GetDataFromApiServerAsync(_ApiMethod) {
  return fetch(apiServerUrl + _ApiMethod)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export { apiServerUrl, GetDataFromApiServerAsync };
