import { Bar } from 'react-chartjs-2';
import './monthlySpecifics.css';


const BarGraph = ({data}) => {
  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Monthly Specifics</h2>
      <Bar data={data} className='monthly-graph' />
    </section>
  );
};

export default BarGraph;
