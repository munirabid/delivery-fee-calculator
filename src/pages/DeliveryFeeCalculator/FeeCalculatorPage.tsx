import React, { useState } from "react";
import { Textfield } from "../../components/forms/TextField/TextField";
import { CalculatorFooter } from "../../components/layout/Footer/Footer";

import { WoltSurcharge, Currency, Distance } from "../../utils/Enums";
import { isFloat } from "../../utils/HelperMethods";

import {
  calculateSurchargeOnCartValue,
  calculateSurchargeOnDistance,
  calculateSurchargeOnItems,
  calculateSurchargeOnRushHours,
  calculateTotalDeliveryCharges,
} from "../../services/DeliveryFeeServices/DeliveryFeeService";

const Calculator: React.FC = () => {
  const [deliveryFee, setdeliveryFee] = useState("0");
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [amoutOfItems, setAmountOfItems] = useState(0);
  const [orderTime, setOrderTime] = useState("");

  const [cartValueError, setcartValueError] = useState("");
  const [deliveryDistanceError, setDeliveryDistanceError] = useState("");
  const [amoutOfItemsError, setAmoutOfItemsError] = useState("");
  const [orderTimeError, setOrderTimeError] = useState("");

  const {
    FreeDeliveryCartValue,
    MinumumFreeCartValue,
    MaximumSurchargeFreeDistanceCovered,
    MaximumSurchargeFreeItems,
    SurchargeOnExtraItem,
    RushHoursDay,
    RushHoursStartTime,
    RushHoursEndTime,
    SurchargeOnRushHours,
    MaximumDeliveryFee,
  } = WoltSurcharge;

  //this function is used to calculate delivery fee
  const calculatePrice = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validate()) {
      return false;
    }

    //check  if cart value is greater or equal to 100
    if (cartValue >= FreeDeliveryCartValue) {
      setdeliveryFee("0");
      return;
    }

    //surcharge on cart vlaue
    let surchargeOnCartValue = calculateSurchargeOnCartValue(
      MinumumFreeCartValue,
      cartValue
    );

    //surcharge on distance
    let surchargeOnDistance = calculateSurchargeOnDistance(
      MaximumSurchargeFreeDistanceCovered,
      deliveryDistance
    );

    //surcharge on number of items
    var surchargeOnItems = calculateSurchargeOnItems(
      MaximumSurchargeFreeItems,
      SurchargeOnExtraItem,
      amoutOfItems
    );

    //sum of surcharge to calculate distance
    var deliverySum =
      surchargeOnCartValue + surchargeOnDistance + surchargeOnItems;

    //surcharge on rush hours
    let surchargeOnRushHours = calculateSurchargeOnRushHours(
      RushHoursDay,
      RushHoursStartTime,
      RushHoursEndTime,
      SurchargeOnRushHours,
      orderTime,
      deliverySum
    );

    //total Delivery Fee
    let totalDeliveryFee = calculateTotalDeliveryCharges(
      MaximumDeliveryFee,
      surchargeOnCartValue,
      surchargeOnDistance,
      surchargeOnItems,
      surchargeOnRushHours
    );

    //set delivery fee
    setdeliveryFee(
      isFloat(totalDeliveryFee)
        ? totalDeliveryFee.toFixed(2)
        : totalDeliveryFee.toString()
    );
  };

  //this function is used to handle onChange event of input
  const setValue = (e: any, setState: any) => {
    setState(e.target.value);
  };

  //this function is used for calculator validation
  const validate = () => {
    setdeliveryFee("0");
    setcartValueError("");
    setDeliveryDistanceError("");
    setAmoutOfItemsError("");
    setOrderTimeError("");

    let isValid = true;

    //check value for cart value
    if (cartValue <= 0) {
      setcartValueError("must be greater than 0");
      isValid = false;
    }

    //check value for distance value
    console.log(isFloat(deliveryDistance));
    if (isFloat(deliveryDistance)) {
      setDeliveryDistanceError("can not be decimal");
      isValid = false;
    } else if (deliveryDistance <= 0) {
      setDeliveryDistanceError("must be greater than 0");
      isValid = false;
    }

    //check value for number of items value
    if (isFloat(amoutOfItems)) {
      setAmoutOfItemsError("can not be decimal");
      isValid = false;
    } else if (amoutOfItems <= 0) {
      setAmoutOfItemsError("must be greater than 0");
      isValid = false;
    }

    //check value for order time value
    if (!orderTime) {
      setOrderTimeError("required");
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <div className="col-sm-4 offset-sm-4">
        <div className="card mt-5">
          <div className="card-header">Delivery Fee Calculator</div>
          <div className="card-body">
            <div className="row mb-2">
              <Textfield
                className="form-control"
                type="number"
                step="0.1"
                min="0"
                value={cartValue}
                onChange={(event) => setValue(event, setCartValue)}
                labeltext="Cart Value"
                errormessage={cartValueError}
              />
              {Currency.Euro}
            </div>
            <div className="row mb-2">
              <Textfield
                className="form-control"
                type="number"
                min="0"
                value={deliveryDistance}
                onChange={(event) => setValue(event, setDeliveryDistance)}
                labeltext="Delivery Distance"
                errormessage={deliveryDistanceError}
              />
              {Distance.Meters}
            </div>
            <div className="row mb-2">
              <Textfield
                className="form-control"
                type="number"
                min="0"
                value={amoutOfItems}
                onChange={(event) => setValue(event, setAmountOfItems)}
                labeltext="Amount of Items"
                errormessage={amoutOfItemsError}
              />
            </div>
            <div className="row mb-2">
              <Textfield
                className="form-control"
                type="datetime-local"
                value={orderTime}
                onChange={(event) => setValue(event, setOrderTime)}
                labeltext="Time"
                errormessage={orderTimeError}
              />
            </div>
          </div>
          <CalculatorFooter
            calculatedDeliveryFee={deliveryFee}
            feeCurrency={Currency.Euro}
            callback={calculatePrice}
          />
        </div>
      </div>
    </>
  );
};

export default Calculator;
