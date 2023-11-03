import React, {useState, useContext} from "react";
import { Text } from "../../../components/text/text.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TextInput } from 'react-native-paper';
import { AccountBackground, AccountCover } from "../components/account.styles";

// button for login
import { SignButton } from "../components/account.styles";
// button for go-back
import { AuthButton } from "../components/account.styles";

// utils from auth context
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
// loader component
import Loader from "../../../components/activityIndicator/activity-indicator.component";

export const LoginContainer = styled.View`
  background-color: rgba(255,255,255,0.7);
  padding: ${props => props.theme.space[4]};
  margin-top: ${props => props.theme.space[2]};
  width: 80%;
`

export const AuthInput = styled(TextInput)`
    width: 100%;
`

export const AuthErrorContainer = styled.View`
    margin-top: ${props => props.theme.space[3]};
    padding: ${props => props.theme.space[2]};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const RegisterScreen = ({ navigation }) => {

    const {onRegister, error, isLoading, appUser} = useContext(AuthenticationContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleInputs = (type, text) => {
        switch(type) {
            case 'email':
                setEmail(text);
                break;
            case 'password':
                setPassword(text);
                break;
            case 'repeatedPassword':
                setRepeatedPassword(text);
                break;
            default:
                return;
        }
    }

    const handleLoginSubmit = () => {
        onRegister(email, password, repeatedPassword);
    }

    return (
        <AccountBackground>
            <AccountCover />
            <Text style={{fontSize: 30}}>Meals To Go</Text>
            <LoginContainer>
                <AuthInput
                    label="Email"
                    value={email}
                    onChangeText={text => handleInputs('email' ,text)}
                    autoCapitalize='none'
                />
                <Spacer size="large" />
                <AuthInput
                    label="Password"
                    type='password'
                    value={password}
                    onChangeText={text => handleInputs('password' ,text)}
                    secureTextEntry
                    autoCapitalize='none'
                />
                <Spacer size="large" />
                <AuthInput
                    label="Repeated Password"
                    type='password'
                    value={repeatedPassword}
                    onChangeText={text => handleInputs('repeatedPassword' ,text)}
                    secureTextEntry
                    autoCapitalize='none'
                />
                <Spacer size="large" />
                <Spacer size="large" />
                {
                    isLoading ? <Loader />
                    : (
                        <SignButton icon="account-cowboy-hat-outline" onPress={handleLoginSubmit}>
                            Register
                        </SignButton>
                    )
                }
                {
                    error && <AuthErrorContainer>
                        <Text variant="error">{error}</Text>
                    </AuthErrorContainer>
                }
            </LoginContainer>
            <Spacer size="large" />
            <AuthButton onPress={() => navigation.navigate("Main")}>
                Back
            </AuthButton>
        </AccountBackground>
    )
}

export default RegisterScreen;