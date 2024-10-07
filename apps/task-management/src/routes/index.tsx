import { Route, Routes } from 'react-router-dom';
import { TaskListPage } from '../pages';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskListPage />} />
    </Routes>
  );
}

export default MainRoutes;
