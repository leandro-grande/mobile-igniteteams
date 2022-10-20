import { UsersThree } from 'phosphor-react-native';
import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 12px;
  padding: 24px;
  background-color: ${({theme}) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD};
  color: ${({theme}) => theme.COLORS.GRAY_200};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`;

export const Icon = styled(UsersThree).attrs(({theme}) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
}))`
  margin-right: 20px;
`;