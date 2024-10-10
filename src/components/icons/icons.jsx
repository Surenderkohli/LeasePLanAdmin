export const CloseIcon = ({ classname, onClick }) => {
    return (
      <span className={classname} onClick={onClick}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.0009 5.99996L11.2435 11.2426M0.75827 11.2426L6.0009 5.99996L0.75827 11.2426ZM11.2435 0.757324L6.0009 5.99996L11.2435 0.757324ZM6.0009 5.99996L0.75827 0.757324L6.0009 5.99996Z"
            stroke="#D4D4D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  };