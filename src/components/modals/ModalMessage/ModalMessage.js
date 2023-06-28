import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useDispatch, useGlobalState } from "../../../context/StoreProvider";
import messagesPostAction from "../../../actions/messagesPostAction";
import imagesApiUtils from "../../../utils/imagesApiUtils";
import ViewTimer from "../../Timer/ViewTimer";
import CommentOptions from "./components/CommentOptions";

const ModalMessage = (props) => {
  const { isCommentModalVisible, item, typePost } = props;
  const { messagesPost, userAuth } = useGlobalState();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [commentInput, setCommentInput] = useState(""); //TODO parece que despues se convierte en object
  const [commentView, setCommentView] = useState(null);
  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };
  const handleCommentPost = () => {
    if (commentInput.trim() !== "") {
      const request = {
        "description": commentInput.trim(),
        "site_user": {
          "id": userAuth.id
        },
        "post_urban": {
          "id": item.id
        }
      }

      messagesPostAction.set(request, dispatch, (response) => {
        //TODO agregar el comentario a la lista pero falta logica con la api
        //setComments((prevComments) => [...prevComments, newComment]);
        getMessage();
        setCommentInput("");
        // setCommentsCount(commentsCount + 1);
      }, (e) => { });
      // const newComment = {
      //   picture: "https://picsum.photos/seed/{seed}/300/200",
      //   userName: "Carlos Slim",
      //   comment: commentInput.trim(),
      //   createDate: "En estos momentos",
      // };
    }
  };
  const onShowModal = () => {
    setShowModal(!showModal);
  };
  const getMessage = () => {
    const request = {
      postType: typePost,//"post_urban",
      post_id: item.id,
      page: 1, //page in de elements
      pageSize: 10, //get api comments total with page
    }
    messagesPostAction.get(request, dispatch, (response) => { }, (e) => { });
  }
  useEffect(() => {
    getMessage();
  }, [])
  //console.log(messagesPost)

  return (
    <Modal
      visible={isCommentModalVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modal.container}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.modal.closeButton} onPress={onClose}>
            <Ionicons name="close" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.modal.header}>
            <Text style={styles.headerText}>Comentarios</Text>
          </View>
          {messagesPost.complete && (
            <ScrollView style={styles.modal.list}>
              {messagesPost.data.map((comment, index) => {
                let avatar = null;

                try {
                  //TODO se renderiza en cada action
                  if (comment?.attributes?.site_user?.data?.attributes?.avatar)
                    avatar = imagesApiUtils.getAvatar(comment.attributes.site_user.data.attributes.avatar)
                }
                catch (_) {

                }

                return (
                  <TouchableOpacity onPress={() => {
                    setCommentView(comment);
                    onShowModal();
                  }} key={index}>
                    <View style={styles.modal.item} >
                      <Image
                        style={styles.modal.avatar}
                        source={avatar ? { uri: avatar } : require("../../../../assets/images/placeholder.png")}
                      />
                      <View style={styles.content}>
                        <Text style={styles.modal.name}>{comment?.attributes.site_user.data.attributes?.name}</Text>
                        <ViewTimer styles={{time: styles.modal.time}} date={comment.attributes.createdAt} />
                        <Text style={styles.modal.text}>{comment.attributes.description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
              {messagesPost.data?.length <= 0 && (
                <Text style={{ ...styles.headerText, marginTop: 10 }}>Sin comentarios, se el primero en comentar!</Text>
              )}
            </ScrollView>
          )}
          <KeyboardAvoidingView
            //style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            //keyboardVerticalOffset={headerHeight}
            keyboardVerticalOffset={Constants.statusBarHeight + 10}
          //keyboardVerticalOffset={height + 47}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modal.inputContainer}>
                <TextInput
                  style={styles.modal.input}
                  placeholder="Escribe un comentario..."
                  value={commentInput}
                  onChangeText={setCommentInput}
                />
                <TouchableOpacity
                  style={styles.modal.postButton}
                  onPress={handleCommentPost}
                >
                  <Text style={styles.modal.postButtonText}>Comentar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </View>
      {showModal && (
        <CommentOptions
          item={commentView}
          modalVisible={showModal}
          onClose={onShowModal}
        />
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  content: {
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 15,
    paddingTop: 5,
    flex: 1,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  modal: {
    container: {
      flex: 1,
      backgroundColor: "#1e1e1e",
      padding: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    closeButton: {
      position: "absolute",
      color: "#fff",
      fill: "#fff",
      top: -5,
      right: 10,
      zIndex: 1,
    },
    body: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      width: "100%",
      maxHeight: "80%",
    },
    newCommentContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    list: {
      flex: 1,
      marginBottom: 10,
      width: "100%",
    },
    item: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginVertical: 5,
      flex: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    name: {
      fontWeight: "bold",
      color: "#fff",
    },
    text: {
      marginTop: 5,
      marginBottom: 10,
      color: "#fff",
      flex: 1,
    },
    time: {
      //color: '#999',
      color: "#aaa",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      width: "100%",
    },
    input: {
      flex: 1,
      height: 40,
      //paddingHorizontal: 10,
      backgroundColor: "#f2f2f2",
      borderRadius: 20,
      marginRight: 10,
      paddingHorizontal: 20,
      color: "#222",
    },
    postButton: {
      backgroundColor: "#f5df4d",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    postButtonText: {
      color: "#222",
      fontWeight: "400",
    },
  },
});
export default ModalMessage;