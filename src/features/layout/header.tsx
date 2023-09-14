import Image from "next/image";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div
      className={
        "sticky top-0 z-10 flex items-center border-b bg-slate-50/70 p-4 px-6 backdrop-blur md:px-8"
      }
    >
      <Image
        src="/img/logogram.svg"
        alt="Unsource"
        width={24}
        height={14}
        className="mr-3 sm:hidden"
      />
      <h1 className="mb-0">{title}</h1>
    </div>
  );
};

export { Header };
