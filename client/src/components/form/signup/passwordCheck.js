import { AlertBg } from '../../alert/alert';

export const PasswordCheck = (props) => {
  const { isPwordLong, pwordHasNum, pwordHasSym, pwordHasUpper } = props;
  return (
    <div className='flex-col align-start mb-1-2 mt-1'>
      <AlertBg
        msg={'password must be 8 characters long'}
        isSuccess={isPwordLong}
      />
      <AlertBg msg={'Password must contain 1 number'} isSuccess={pwordHasNum} />
      <AlertBg
        msg={'Password must contain 1 symbol e.g., !@#$'}
        isSuccess={pwordHasSym}
      />
      <AlertBg
        msg={'Password must contain 1 uppercase letter'}
        isSuccess={pwordHasUpper}
      />
    </div>
  );
};
