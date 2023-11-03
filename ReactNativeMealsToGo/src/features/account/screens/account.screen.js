import React from "react";
import { Text } from "../../../components/text/text.component";
import LottieView from 'lottie-react-native';

import { 
    AccountBackground, 
    AccountCover,
    AccountContainer,
    AuthButton,
    AnimationWrapper,
} from "../components/account.styles";

// spacer helper component
import {Spacer} from '../../../components/spacer/spacer.component';

const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          autoPlay
          key="animation"
          resizeMode="cover"
          source={require('../../../../assets/watermelon.json')}
        />
      </AnimationWrapper>
      <Text style={{fontSize: 30}}>Meals To Go</Text>
      <AccountContainer>
        <AuthButton icon="account-lock-open-outline" onPress={() => navigation.navigate("Login")}>
            Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton icon="account-cowboy-hat-outline" onPress={() => navigation.navigate("Register")}>
            Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
};

export default AccountScreen;