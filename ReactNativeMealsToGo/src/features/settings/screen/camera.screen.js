import React, {useEffect, useRef, useContext} from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import styled from 'styled-components';
import { Camera, CameraType } from 'expo-camera';
import { Text } from '../../../components/text/text.component';
import { View, TouchableOpacity } from 'react-native';

// storing photo
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const ProfileCamera = styled(Camera)`
    flex: 1;
    width: 100%;
    height: 100%;
`

const InnerSnap = styled(View)`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const CameraScreen = ({ navigation }) => {
    // this entire component was build based on documentaion  https://docs.expo.dev/versions/latest/sdk/camera/
    const { appUser } = useContext(AuthenticationContext);
    const CameraRef = useRef();
    const [permission, setHasPermission] = Camera.useCameraPermissions();

    const snap = async () => {
        if (CameraRef) {
            const photo = await CameraRef.current.takePictureAsync();
            await AsyncStorage.setItem(`${appUser.uid}-photo`, photo.uri)
            navigation.goBack();
        }
    };

    useEffect(() => {
        const askForCameraPermission = async() => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        }
        askForCameraPermission();
    }, [])

    if(!permission) {
        return (
            <Container>
                <Text>No access to camera.</Text>
            </Container>
        )
    }

    return (
        <ProfileCamera ref={(camera) => CameraRef.current = camera} type={CameraType.front}>
            <TouchableOpacity onPress={snap}>
                <InnerSnap />
            </TouchableOpacity>
        </ProfileCamera>
    );
}

export default CameraScreen;