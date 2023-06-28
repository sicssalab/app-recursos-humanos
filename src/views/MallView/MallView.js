import React, { useEffect, useRef, useState } from "react";
import { FlatList, SectionList, View,Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeComponent } from "../../components";
import Divider from "../../components/Divider";
import { Input } from "../AvenuesView/components/Input";
import SceneName from "../../constants/SceneName";
import GlobalPost from "../../components/posts/GlobalPost";
import StateDropdown from "../AvenuesView/components/StateDropdown";
import { Container, OptionsContainer } from "../AvenuesView/styles";
import { Header } from "./components/Header";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import { typeMockConstants } from "../../constants/typeMockConstants";
import NoFoundResult from "../../components/ui/NoFoundResult/NoFoundResult";
import ItemContact from "../../components/contact/ItemContact/ItemContact";
import contactListAction from "../../actions/contactListAction";

function Component() {
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showModalComment, setShowModalComment] = useState(false);
  const { contactList } = useGlobalState();
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const [visibles, setvisible] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    contactListAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (contactList.complete) setFilteredPosts(contactList.data);
  }, [contactList]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setValueSearch(e);
    if (e == "") setFilteredPosts(contactList.data);
    else
      setFilteredPosts(
        contactList.data.filter(
          (servicio) =>
            removeAccents(servicio.attributes?.name.toLowerCase()).indexOf(
              removeAccents(e.toLowerCase())
            ) >= 0
        )
      );
  };

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.MALL_PROFILE,
    };

    navigation.navigate(SceneName.GroupProfile, { profilePage });
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setvisible(
      viewableItems.map((item) => {
        return {
          index: item.index,
        };
      })
    );
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    contactListAction.get({}, dispatch, (response) => {
      setRefreshing(false);
      console.log("refesh items")
    });
  }, []);
  const onShowComments = () => {
    setShowModalComment(!showModalComment);
  };

  const onPressItemContact = () => {
    onShowComments();
  }

  return (
    <SafeComponent request={contactList}>
      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl colors="#ff4500" refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <>
              <Header />
              <OptionsContainer>
                <Input
                  placeholder="Buscar"
                  value={valueSearch}
                  onChangeText={onChangeInput}
                  maxLength={500}
                />
              </OptionsContainer>
            </>
          }
          data={filteredPosts}
          renderItem={({ item, index }) => {
            // const isVisible = visibles.findIndex((i) => i.index == index);
            // //isVisible >= 0 && console.log(isVisible, item.name);

            return (
              <ItemContact item={item} onPress={onPressItemContact} />
            );
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
          ListFooterComponent={
            <NoFoundResult
              section={{
                data: filteredPosts,
              }}
              valueSearch={valueSearch}
            />
          }
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
