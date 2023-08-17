interface HeaderProps {
  title: string;
  renderHeaderRight?: () => React.ReactElement;
}

const Header = ({ title, renderHeaderRight }: HeaderProps) => (
  <div className="sticky top-0 z-10 flex justify-between border-b bg-slate-50/70 p-4 backdrop-blur">
    <h1 className="mb-0">{title}</h1>

    {renderHeaderRight?.()}
  </div>
);

export { Header };
