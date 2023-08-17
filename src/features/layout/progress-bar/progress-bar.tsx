"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import "./style.css";

const ProgressBarProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <>
    {children}
    <ProgressBar
      color="#f18c4d"
      height="4px"
      shallowRouting
      options={{
        showSpinner: false,
      }}
    />
  </>
);

export { ProgressBarProvider };
