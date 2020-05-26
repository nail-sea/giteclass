import { TouchableOpacity } from "react-native";
export default props => (
  <TouchableOpacity {...props} activeOpacity={1}>
    {props.children}
  </TouchableOpacity>
);
