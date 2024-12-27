import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';
import StartPage from '../pages/test/StartPage';
import ListPage from '../pages/test/listPage';
import ResultPage from '../pages/test/ResultPage';
const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="/test/start" element={<StartPage />} />
        <Route path="/test/list" element={<ListPage />} />
        <Route path="/test/result" element={<ResultPage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
