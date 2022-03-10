import CheckAccess from './CheckAccess';

const UseCheckAccess = (props) => {
  return (
    <CheckAccess>
      {(props) => {
        const { isAccessible } = props;

        return <div></div>;
      }}
    </CheckAccess>
  );
};

export default UseCheckAccess;
