const FormattedMessageComp = ({ className, children, condition }: any) => {
  return (
    <div className={className} data-condition={condition}>
      {children}
    </div>
  );
};

export default FormattedMessageComp;
