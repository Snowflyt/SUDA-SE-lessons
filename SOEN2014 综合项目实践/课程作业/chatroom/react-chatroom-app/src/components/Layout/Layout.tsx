import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
