import React, { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component.jsx';

import { Note, SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            // dispatch(signUpStart(email, password, displayName));
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email arleady in use');
            } else {
                console.log("Error: ", error);
            }
        };
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <Note>Don't have an account?</Note>
            <span>Sign up with you email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Display Name' onChange={handleChange} name="displayName" value={displayName} type="text" required />
                <FormInput label='Email' onChange={handleChange} name="email" value={email} type="email" required />
                <FormInput label='Password' onChange={handleChange} name="password" value={password} type="password" required />
                <FormInput label='Confirm Password' onChange={handleChange} name="confirmPassword" value={confirmPassword} type="password" required />

                {/* Submit button */}
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer >
    )
}

export default SignUpForm;