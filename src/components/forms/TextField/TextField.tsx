import React from "react";

type InputProps = {
  // The common Part
  className: string;
  type: string;
  value: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labeltext: string;
  errormessage: string;
} & {
  // The discriminated union
  step?: string;
  min?: string;
};

export const Textfield: React.FC<InputProps> = (props: InputProps) => {
  return (
    <>
      <label className="col-sm-5">{props.labeltext}</label>
      <div className="col-sm-6">
        <input {...props} />
        <span className="text-danger">{props.errormessage}</span>
      </div>
    </>
  );
};
