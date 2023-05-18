import React, { useEffect, useRef, useState } from "react";
import { FlatList, SectionList, View } from "react-native";
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
import mallsStatesAction from "../../actions/mallsStatesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";
import NoFoundResult from "../../components/ui/NoFoundResult/NoFoundResult";

function Component() {
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { mallsStates } = useGlobalState();
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [visibles, setvisible] = useState([]);
  useEffect(() => {
    mallsStatesAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (mallsStates.complete) setFilteredPosts(mallsStates.data);
  }, [mallsStates]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setValueSearch(e);
    if (e == "") setFilteredPosts(mallsStates.data);
    else
      setFilteredPosts(
        mallsStates.data.filter(
          (servicio) =>
            //removeAccents(servicio.name.toUpperCase()) >= removeAccents(e.toUpperCase())
            removeAccents(servicio.name.toLowerCase()).indexOf(
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
  return (
    <SafeComponent request={mallsStates}>
      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
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
            const isVisible = visibles.findIndex((i) => i.index == index);
            //isVisible >= 0 && console.log(isVisible, item.name);

            return (
              <GlobalPost
                isVisible={isVisible >= 0 ? true : false}
                item={item}
                onNavigateClick={() => onNavigateClick(item)}
              />
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
