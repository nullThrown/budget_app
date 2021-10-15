import '../expenditures/expenditures.css';
import { Header } from './heading';
import { Nav } from './nav';
import { Table } from './table';
export const Expenditures = () => {
  return (
    <section className='expenditures-box'>
      <Header />
      <main className='main'>
        <Nav />
        <Table />
      </main>
    </section>
  );
};
