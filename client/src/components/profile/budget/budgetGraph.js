import { Bar } from 'react-chartjs-2';
import './budgetGraph.css';
import { useSelector } from 'react-redux';

export const categories = [
  {
    _id: 'aslkdsjad39',
    title: 'vehicle',
    budget: 500,
  },
  {
    _id: 'aslkd3230-9',
    title: 'misc',
    budget: 400,
  },
  {
    _id: 'kasdja29',
    title: 'Dining',
    budget: 200,
  },
  {
    _id: 'asdjaj2093',
    title: 'utlities',
    budget: 400,
  },
];

// will require an array of objects
//
// object shape
// {
//   title: 'vehicle',
//   budget: 500,
//   spent: 255,
//},
// this array will be passed into the barData function

// restructure Model for profile.categories
// category: { name: 'housing', budget: 500}
// remove budget from recurring model

// restructure profile.recurring
// remove budget/total -- virtual function
// remove payments obj
// place recurring on top level within data array
// rec: {
//_id: ObjectId,
// category: String,
// name: String,
// amount: Number,
// necessity: Boolean,

//

//}
//

// select state.expenses
// select state.recurring
// create barData state

// useEffect: add expenses total to each category
// loop thru categories
// nested loop thru expenses
// if cat.title === exp.category
// add nec.amount to spent

// useEffect: add recurring total to each category
// loop thru categories
// nested loop thru recurring
// if rec.cat.title ===

const BudgetGraph = ({ barData }) => {
  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Budget</h2>
      <Bar data={barData(categories)} className='monthly-graph' />
    </section>
  );
};

export default BudgetGraph;
