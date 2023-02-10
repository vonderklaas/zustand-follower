import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';

import { Users } from './pages/Users';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};
