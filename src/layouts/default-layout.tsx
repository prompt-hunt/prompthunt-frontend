import cx from "classnames";
import { ReactNode } from "react";

import { Container } from "@components/layout/container";
import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";

export const DefaultLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cx("flex min-h-screen flex-col", className)}>
      <Navbar />
      <main className="flex-1 pb-20 pt-6">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};
