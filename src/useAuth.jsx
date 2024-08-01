import { auth } from './firebase';

export const useAuth = () => ({ currentUser: auth.currentUser });