const ArrowSvg = ({
  width = 66,
  height = 66,
  targetRef,
  fill = 'black',
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 66 66'
      fill='none'
      targetRef={targetRef}
      {...props}
    >
      <path
        d='M66 1.16361e-06L43.7048 6.02148L60.0672 22.3189L66 1.16361e-06ZM3.41702 65.6662L54.7144 14.1646L51.8804 11.3418L0.582979 62.8434L3.41702 65.6662Z'
        fill={fill}
      />
    </svg>
  );
};

export default ArrowSvg;
