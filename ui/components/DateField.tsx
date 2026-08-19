"use client";

import { useRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function DateField(props: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      {...props}
      ref={ref}
      onFocus={() => {
        if (typeof ref.current?.showPicker === "function") {
          ref.current.showPicker();
        }
      }}
    />
  );
}
