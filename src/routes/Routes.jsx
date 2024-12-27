import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
