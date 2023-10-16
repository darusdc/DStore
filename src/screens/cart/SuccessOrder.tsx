import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { LargeText, SmallText } from "../../components/Text";
import Button from "../../components/Button/button";
import { WelcomeScreenStyle } from "../onboarding/WelcomeScreenStyle";
import { StackNavigation } from "../../navigation/MainNavigation";

const SuccessOrderScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const route : RouteProp<{ params: { orderId: Number } }>  = useRoute()
    const orderId = route.params?.orderId;
  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        marginVertical: 200,
      }}
    >
      <AnimatedLottieView
        source={require("../../assets/lottie/success.json")}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
      <LargeText text="Thank you" style={{ fontWeight: "bold" }} />
      <SmallText
        text={`Your order has been placed. Order id: ${orderId}, You will receive a confirmation in your email`}
        style={{ textAlign: "center", marginHorizontal: 20 }}
      />
      <Button
        containerStyle={[
          WelcomeScreenStyle.primaryButtonContainer,
          { marginTop: 20 },
        ]}
        text="Continue shopping"
        textStyle={WelcomeScreenStyle.primaryTextButton}
        onPress={() => {
          navigation.navigate('HomeTab', { screen: 'Home'})
        }}
      />
    </View>
  );
};

export default SuccessOrderScreen;
