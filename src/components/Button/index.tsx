import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Title } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
}

export const Button = ({ title, type = 'primary', ...rest }: ButtonProps) => {
  return (
    <Container type={type} {...rest} >
      <Title>
        {title}
      </Title> 
    </Container>
  )
}
