import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';
import { Event, EventFormValues } from '../models/Event';
import { User, UserFormValues } from '../models/User';
import { Photo, Profile } from '../models/Profile';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:3001/api';

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 404:
        history.push('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

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
  create: (event: EventFormValues) => requests.post<void>('/events', event),
  update: (event: EventFormValues) =>
    requests.put<void>(`/events/${event.id}`, event),
  delete: (id: string) => requests.del<void>(`/events/${id}`),
  attend: (id: string) => requests.post<void>(`/events/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) =>
    requests.post<User>('/account/register', user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);

    return axios.post<Photo>('photos', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },

  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
};

const agent = {
  Events,
  Account,
  Profiles,
};

export default agent;
