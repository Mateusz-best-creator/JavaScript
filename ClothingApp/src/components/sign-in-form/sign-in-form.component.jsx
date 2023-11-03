import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component.jsx';

import {
    ButtonsContainer,
    SignUpContainer,
} from './sign-in-form.styles.jsx';

// react-redux
import { useDispatch } from "react-redux";

// firebase utils
import { 
    signInUserWithEmailAndPassword, 
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

// redux toolkit action
import { setCurrentUser } from "../../store/user/user.reducer";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInUserWithEmailAndPassword(email, password);
            dispatch(setCurrentUser(user));
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log('Error : ', error);
            }
        };
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    // create instance
    async function signInWithGoogle () {
        await signInWithGooglePopup();
    }

    return (
        <SignUpContainer>
            <h2>Arleady have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' onChange={handleChange} name="email" value={email} type="email" required />
                <FormInput label='Password' onChange={handleChange} name="password" value={password} type="password" required />

                {/* Submit buttons */}
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={() => signInWithGoogle()}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;