import Header from './header';
import SessionForm from './session-form';
import Footer from './footer';

const DataTable: React.FC = () => {
  return (
    <div className='w-full max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 rounded-xl'>
      <div className='bg-white rounded-xl shadow-xl border border-gray-100'>
        <Header />
        <SessionForm />
        <Footer />
      </div>
    </div>
  );
};

export default DataTable;
