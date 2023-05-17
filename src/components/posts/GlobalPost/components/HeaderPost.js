import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalOptions from "./ModalOptions";

const HeaderPost = (props) => {
  const { item, hasSandWith } = props;
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  const onNavigateClick = () => {
    const { onNavigateClick } = props;
    onNavigateClick && onNavigateClick();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onNavigateClick}>
        <Image style={styles.avatar} source={{ uri: item.picture }} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onNavigateClick}>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>
          {item.hasPremium ? "Privado" : "Publico"}, {item.createDate}
        </Text>
      </View>
      {item.hasPremium && <Image source={require('../../../../assets/images/logo_premium.png')} style={styles.logoPremium} />}
      {hasSandWith && (
        <TouchableOpacity style={styles.icon} onPress={onShowModal}>
          <Icon name="dots-vertical" size={20} color="#999" />
        </TouchableOpacity>
      )}
      <ModalOptions
        item={item}
        modalVisible={showModal}
        onClose={onShowModal}
      />
    </View>
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

HeaderPost.defaultProps = {
  hasSandWith: true,
};
export default HeaderPost;
