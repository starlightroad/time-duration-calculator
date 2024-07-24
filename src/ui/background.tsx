type Props = {
  children: React.ReactNode;
};

export default function Background({ children }: Props) {
  return <div className="h-full bg-white dark:bg-black dark:opacity-95">{children}</div>;
}
