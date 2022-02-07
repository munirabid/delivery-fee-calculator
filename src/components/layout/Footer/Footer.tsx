import React from "react";

type props = {
  calculatedDeliveryFee: string;
  feeCurrency: string;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CalculatorFooter: React.FC<props> = ({
  calculatedDeliveryFee,
  feeCurrency,
  callback,
}) => {
  return (
    <div className="card-footer text-muted">
      <div className="row">
        <div className="col-lg-6">
          <button className="btn btn-primary" onClick={callback}>
            Calculate Delivery Price{" "}
          </button>
        </div>
        <div className="col-lg-6">
          <p className="pt-5 text-right">
            Delivery Price: {calculatedDeliveryFee}
            {feeCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};
