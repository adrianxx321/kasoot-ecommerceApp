import React from "react";
import { View } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone";

const BankCardInput = ({cardInfo, setCardInfo}) => {
  const _onChange = (formData) => {
    // Update the cardInfo state using setCardInfo function
    setCardInfo(formData);
  };

  return (
    <View>
      <LiteCreditCardInput
        inputStyle={{ fontSize: ScreenRatio_iPhone(16) }}
        validColor={"green"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onChange={_onChange}
      />
    </View>
  );
};

export default BankCardInput;
