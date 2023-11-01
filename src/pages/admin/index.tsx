import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { requireNextAuth } from '@roq/nextjs';
const AdminApp = dynamic(() => import('../../components/admin-app'), { ssr: false });

const AdminPage: NextPage = () => {
  return <AdminApp />;
};

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: '/',
})(AdminPage);
