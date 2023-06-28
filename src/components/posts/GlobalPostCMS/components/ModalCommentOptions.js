import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Clipboard from 'expo-clipboard';
import { useGlobalState } from "../../../../context/StoreProvider";

const ModalCommentOptions = (props) => {
  const { modalVisible, item } = props;
  const { userAuth } = useGlobalState();
  const [copiedText, setCopiedText] = useState('');
  console.log(item)
  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(item.attributes.description);
    onClose();
  };

  //TODO de Clipboard lo paso al codigo
  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  // };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{ margin: 0 }}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.modalInside}>
            {item?.attributes?.site_user?.data?.id === userAuth.id && (
              <View style={styles.contentOpciones}>
                <Text style={styles.textOpciones}>Editar</Text>
              </View>
            )}
            <TouchableOpacity onPress={copyToClipboard} style={styles.contentOpciones}>
              <Text style={styles.textOpciones}>Copiar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.contentOpciones}>
                <Text style={styles.textOpciones}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainerBody: {
    backgroundColor: "#1e1e1e",
    borderTopColor: "gold",
    borderLeftColor: "gold",
    borderRightColor: "gold",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: Constants.statusBarHeight,
    width: "100%",
    alignItems: "center",
    height: 250,
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  modalInside: {
    backgroundColor: "#242526",
    width: "100%",
    height: 150,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  contentOpciones: {
    borderBottomWidth: 1,
    borderColor: "#3E4042",
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  textOpciones: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    color: "#fff",
    fill: "#fff",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
export default ModalCommentOptions;
