import AdminPage from '../admin/page'
import SuperadminPage from '../superadmin/page';
import { useRouter } from 'next/router';

export default function SubdomainPage({ subdomain }) {
  if (!subdomain) {
    return <div>Subdomain not found</div>;
  }

  if (subdomain === 'admin') {
    return <AdminPage />;
  } else if (subdomain === 'superadmin') {
    return <SuperadminPage/>;
  }

  return <div>Welcome to the user subdomain</div>;
}

export async function getServerSideProps(context) {
  const { subdomain } = context.params || {};

  if (!subdomain) {
    return {
      props: {},
    };
  }

  return {
    props: { subdomain }, 
  };
}
