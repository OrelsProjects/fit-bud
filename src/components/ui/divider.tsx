import React from "react";

interface DividerProps {
  className?: string;
  textInCenter?: string;
}

export default function Divider({ className, textInCenter }: DividerProps) {
  return (
    <div
      className={`w-full flex flex-row items-center justify-center ${className}`}
    >
      <div className="w-full h-px bg-muted"></div>
      {textInCenter && (
        <div className="mx-2 text-muted-foreground">{textInCenter}</div>
      )}
      <div className="w-full h-px bg-muted"></div>
    </div>
  );
}