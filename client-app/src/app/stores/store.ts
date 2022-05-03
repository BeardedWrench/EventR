import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import EventStore from './eventStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import UserStore from './userStore';

interface Store {
  eventStore: EventStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  eventStore: new EventStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
