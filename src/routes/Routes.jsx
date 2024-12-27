import { Routes as ReactRouters, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

//pages
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';
import StartPage from '../pages/test/StartPage';
import ResultPage from '../pages/test/ResultPage';
import ListPage2 from '../pages/test/ListPage2';
const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="/test/start" element={<StartPage />} />
        <Route path="/test/list" element={<ListPage2 />} />
        <Route path="/test/result" element={<ResultPage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
