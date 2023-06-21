import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchIcon from "../../../assets/icons/general/search.svg";
import CancelIcon from '../../../assets/images/Cancel.svg';
import { useRef } from "react";
import { useState } from "react";

const InputSearch = (props) => {
    const {} = props;
    const inputRef = useRef();
    const [inValue, setInValue] = useState("");
    const onPressInpunt = () => {
        inputRef.current?.focus();
    }
    const onCleanInput = () => {
        const {onSubmit} = props;
        setInValue("");
        onSubmit && onSubmit("");
    }
    const onChangeInput = (value) => {
        setInValue(value);
    }
    const onSubmit = () => {
        const {onSubmit} = props;
        console.log(inValue)
        onSubmit && onSubmit(inValue);
    }

    return (<View style={styles.container}>
        <TouchableOpacity onPress={onPressInpunt}>
            <SearchIcon fill={"black"} />
        </TouchableOpacity>
        <View style={{ paddingLeft: 5, flex: 1 }}>
            <TouchableOpacity onPress={onPressInpunt}>
                <Text style={{ fontWeight: "bold" }}>¿Qué estás buscando?</Text>
            </TouchableOpacity>
            <TextInput placeholder="Frikis, Pride, Otros" ref={inputRef} 
                onChangeText={onChangeInput}
                onSubmitEditing={onSubmit}
            value={inValue} />
        </View>
        {inValue != "" && (
        <TouchableOpacity onPress={onCleanInput}>
            <CancelIcon fill={"#3E4042"} width={20} height={20} />
        </TouchableOpacity>
        )}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        border: 1, borderColor: "white", flexDirection: "row", backgroundColor: "#f2f2f2", borderRadius: 30, paddingHorizontal: 10, paddingVertical: 5,
        shadowColor: '#FFF',
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
export default InputSearch;