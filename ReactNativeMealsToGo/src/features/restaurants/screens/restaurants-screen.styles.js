import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from 'react-native';

// React native-paper
import { Searchbar } from 'react-native-paper';

export const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `padding-top: ${StatusBar.currentHeight}px`};
`

export const SearchBarContainer = styled.View`
    padding: ${props => props.theme.space[3]};
`

export const SearchingBar = styled(Searchbar)`
    border-radius: ${props => props.theme.space[2]};
    margin-bottom: ${props => props.theme.space[3]};
`

export const LoaderContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`