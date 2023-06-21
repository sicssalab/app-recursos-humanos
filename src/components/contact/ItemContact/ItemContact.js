import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import imagesApiUtils from "../../../utils/imagesApiUtils";
import { useEffect } from "react";

const ItemContact = (props) => {
    const { item } = props;
    const [urlImage, setUrlImage] = useState("");
    const onNavigateClick = () => {
        // const { onNavigateClick } = props;
        // onNavigateClick && onNavigateClick();
    };

    useEffect(() => {
        try {
          setUrlImage(imagesApiUtils.getAvatar(item.attributes.avatar));
        }
        catch (_) {
          setUrlImage("")
        }
      }, [item])

    return (
        <TouchableOpacity onPress={onNavigateClick} style={styles.header}>
            <Image
                source={urlImage
                    ? { uri: urlImage }
                    : imagesApiUtils.imagenPlaceholder}
                style={styles.avatar} />
            <View style={styles.headerContent}>
                <Text style={styles.name}>{`${item?.attributes?.name?.split(" ")[0]} ${item?.attributes?.lastname && item?.attributes?.lastname?.split(" ")[0]}`}</Text>
                {item.attributes?.department_user && (
                    <Text style={styles.time}>
                        {item.attributes?.department_user?.data.attributes.name} - Puerto X
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    headerContent: {
        flex: 1,
        paddingVertical: 5,
        marginLeft: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
        textTransform: "uppercase"
    },
    time: {
        //color: '#999',
        fontSize: 14,
        color: "#aaa",
    },
    logoPremium: {
        width: 30,
        height: 30,
    },
    icon: {
        marginLeft: 10,
        color: "#fff",
    },
});

ItemContact.defaultProps = {
    item: {
        name: "pedrito juarez",
        lastname: "Segura"
    }
};
export default ItemContact;