type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = (props: Props) => {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
};
