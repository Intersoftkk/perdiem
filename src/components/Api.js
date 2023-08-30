import { IsConnected } from "./IsConnected";
export const baseUrl = 'https://jsonplaceholder.typicode.com/';
export const callGetApi = async (endPoints, additionalHeaders) => {
  let isOnline = await IsConnected();
  if (!isOnline) {
    return {
      message:
        'You are currently offline. Please turn on your mobile data or connect with a high speed WiFi Network.',
    };
  }

  var myHeaders = new Headers();
  myHeaders.append('Access-Token', additionalHeaders);
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: '',
    redirect: 'follow',
  };
  let response = await fetch(baseUrl + endPoints, requestOptions);
  if (response.status == 500) {
    return {message: 'Internal Server Error !'};
  }
  let res = await response.json();
  return res;
};

export const parseApiResponseMessage = data =>
  typeof data == 'object' ? data[Object.keys(data)[0]] : data;

export const endPoints = {
  todos: 'todos', 
  posts: 'posts'
}