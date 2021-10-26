import { GiCheckMark } from 'react-icons/gi';
import { MdDangerous } from 'react-icons/md';
import './alert.css';

export const AlertBg = (props) => {
  const { msg, isSuccess } = props;
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
export const Alert = (props) => {
  const { msg, isSuccess } = props;
  console.log(isSuccess);
  return (
    <figure>
      <figcaption
        className={
          'flex align-center alert ' +
          (isSuccess ? 'alert--success ' : 'alert--failure')
        }>
        {isSuccess ? <GiCheckMark /> : <MdDangerous />} {msg}
      </figcaption>
    </figure>
  );
};
