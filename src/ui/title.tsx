type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return (
    <h1 className="my-4 text-center text-4xl font-medium text-gray-900 dark:text-white">
      {children}
    </h1>
  );
}
