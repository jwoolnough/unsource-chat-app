import { Legal } from "@/features/layout/legal";
import { Masthead } from "@/features/layout/masthead";

export default function MiscLayout({ children }: WithChildren) {
  return (
    <>
      <Masthead />
      {children}
      <Legal />
    </>
  );
}
