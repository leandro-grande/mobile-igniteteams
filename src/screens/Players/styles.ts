import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};

  padding: 24px;
`;

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  border-radius: 6px;
`;

export const HeaderList = styled.View`
  width: 100%;
  margin: 32px 0 16px;
  flex-direction: row;
  align-items: center;
`;

export const NumbersOfPlayers = styled.Text`

  ${({theme}) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM};
  `}
`;