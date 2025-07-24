// UserContext.ts
import type User from '@/interfaces/user';
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';



interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContext>({} as UserContext);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
const useUser = () => useContext(UserContext);


export { UserProvider, useUser };

