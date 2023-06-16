import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import dateUtils from "../../utils/dateUtils";
import { useState } from "react";
import { useEffect } from "react";

const ViewTimer = (props) => {
    const { styles, date } = props;
    const [inDate, setInDate] = useState("");

    useEffect(() => {
        setInDate(dateUtils.timeEstimation(date)); //first time
        const interval = setInterval(() => {
            setInDate(dateUtils.timeEstimation(date))
        }, 1000 * 60);
        return () => {
            clearInterval(interval);
        }
    },[]);
    return (
        <Text style={styles.time}>{inDate}</Text>
    );
}

export default ViewTimer;