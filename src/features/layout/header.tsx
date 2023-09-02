interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div
      className={
        "sticky top-0 z-10 flex justify-between border-b bg-slate-50/70 p-4 px-6 backdrop-blur md:px-8"
      }
    >
      <h1 className="mb-0">{title}</h1>
    </div>
  );
};

export { Header };
