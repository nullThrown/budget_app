import '../expenditures/expenditures.css';
import { Header } from './header';
import { Nav } from './nav';
import { Table } from './table';
export const Expenditures = () => {
  return (
    <section className='expenditures-box'>
      <Header />
      <main className='main'>
        {/* <Nav /> */}
        <Table />
      </main>
    </section>
  );
};

// NOTES
// place nav into category options -- make it look fancy
