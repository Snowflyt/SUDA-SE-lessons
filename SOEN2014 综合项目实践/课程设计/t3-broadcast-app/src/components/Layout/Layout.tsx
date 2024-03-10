import Head from 'next/head';

import NavBar from './NavBar';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>在线教育直播课堂</title>
      </Head>
      <NavBar />
      <main className="fixed left-20 h-screen w-[calc(100vw-5rem)]">
        {children}
      </main>
    </>
  );
};

export default Layout;
