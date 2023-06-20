import { View, TextInput } from "react-native";
import SearchIcon from "../../../assets/icons/general/search.svg";

const InputSearch = () => {
    return ( <View style={{border: 1, borderColor: "white"}}>
        <SearchIcon fill={"white"} />
        <TextInput />
    </View> );
}
 
export default InputSearch;