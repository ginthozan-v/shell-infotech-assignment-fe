import { Routes, Route } from 'react-router-dom';
import CafePage from './pages/CafePage';
import Layout from './components/Layout';
import EmployeePage from './pages/EmployeePage';
import CafeForm from './pages/CafePage/Form';
import EmployeeForm from './pages/EmployeePage/Form';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CafePage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/create-cafe" element={<CafeForm />} />
        <Route path="/edit-cafe/:id" element={<CafeForm />} />
        <Route path="/cafe/edit-cafe/:id" element={<CafeForm />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        <Route path="/employee/edit-employee/:id" element={<EmployeeForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
