const CheckAccess = (props) => {
  const isAccessible = () => {
    console.log('check accessible');
  };

  return (
    <>
      {props.children({
        ...props,
        isAccessible,
      })}
    </>
  );
};

export default CheckAccess;
