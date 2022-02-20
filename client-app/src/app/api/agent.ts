import axios, { AxiosResponse } from 'axios';
import Event from '../models/Event';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

//fake loading times
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Events = {
  list: () => requests.get<Event[]>('/events'),
  details: (id: string) => requests.get<Event>(`/events/${id}`),
  create: (event: Event) => requests.post<void>('/events', event),
  update: (event: Event) => requests.put<void>(`/events/${event.id}`, event),
  delete: (id: string) => requests.del<void>(`/events/${id}`),
};

const agent = {
  Events,
};

export default agent;
