import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from "react-native";

import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

type ButtonIconProps = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export const ButtonIcon = ({ type = "primary", icon, ...rest }: ButtonIconProps) => {
  return (
    <Container type={type} {...rest}>
      <Icon name={icon} type={type}  />

    </Container>
  )
}