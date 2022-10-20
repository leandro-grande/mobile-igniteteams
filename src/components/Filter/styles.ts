import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
  isActive?: boolean;
}

export const Container = styled.TouchableOpacity<FilterStyleProps>`
  margin-right: 12px;
  border-radius: 4px;
  height: 38px;
  width: 70px;
  align-items: center;
  justify-content: center;

  ${({theme, isActive}) => isActive && css`
    border: 1px solid ${ theme.COLORS.GREEN_700 };
  `}
`;

export const Title = styled.Text`
  text-transform: uppercase;

  ${({theme}) => css`
      font-family: ${theme.FONT_FAMILY.BOLD};
      font-size: ${theme.FONT_SIZE.SM};
      color: ${theme.COLORS.WHITE}
    `}
`;