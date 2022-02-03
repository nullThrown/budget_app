import { GiCheckMark } from 'react-icons/gi';
import { MdDangerous } from 'react-icons/md';
import './alert.css';

export const Alert = ({ msg }) => {
  return (
    <figure>
      <figcaption className='flex align-center alert alert--danger'>
        {msg}
      </figcaption>
    </figure>
  );
};

export const AlertBg = ({ msg, isSuccess }) => {
  return (
    <figure>
      <figcaption
        className={
          'flex align-center alert ' +
          (isSuccess ? 'text-bg-green' : 'text-bg-red')
        }>
        {isSuccess ? <GiCheckMark /> : <MdDangerous />} {msg}
      </figcaption>
    </figure>
  );
};
