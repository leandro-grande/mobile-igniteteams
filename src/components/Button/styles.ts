import styled from "styled-components/native";

export type ButtonTypeStyleProps = 'primary' | 'secondary';

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme, type}) => type === 'primary' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({theme}) => theme.COLORS.WHITE};
`