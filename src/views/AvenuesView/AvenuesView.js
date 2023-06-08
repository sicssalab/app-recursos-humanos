import React, { useContext, useState, useEffect, useRef } from "react";
import { SectionList, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SceneName from "../../constants/SceneName";
import GlobalPost from "../../components/posts/GlobalPost";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import StateDropdown from "./components/StateDropdown";
import { SafeComponent } from "../../components";
import { Container, OptionsContainer } from "./styles";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import statesListAction from "../../actions/statesListAction";
import NoFoundResult from "../../components/ui/NoFoundResult/NoFoundResult";
import { typeMockConstants } from "../../constants/typeMockConstants";
import trainingListAction from "../../actions/trainingListAction";

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { statesList, trainingList } = useGlobalState(); //statesList tipos de servicio
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [visibles, setvisible] = useState([]);

  useEffect(() => {
    statesListAction.get({}, dispatch);
    trainingListAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (statesList.complete) {
      setStates(
        statesList.data.map((state) => ({
          code: state.id,
          name: state.name,
        }))
      );
    }
  }, [statesList]);

  const updateFilteredAvenuesAndPosts = (stateId, avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO Muesta la lista de servicios por la avenida seleccionada
    if (stateId) {
      //TODO seleccionar todos los servicios de X estado
      const services = trainingList.data.filter(
        (servicio) => servicio.service_id === stateId
      );
      setFilteredPosts(services);
    } else {
      setFilteredPosts([]);
    }
  };

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.AVENUES_PROFILE,
    };

    navigation.navigate(SceneName.GroupProfile, { profilePage });
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setKeyword(e);
    //TODO selec
    const filteredAvenues = trainingList.data.filter(
      (servicio) => servicio.service_id === selectedStateId
    );

    if (e == "") setFilteredPosts(filteredAvenues);
    else
      setFilteredPosts(
        filteredAvenues.filter(
          (servicio) =>
            removeAccents(servicio.name.toLowerCase()).indexOf(
              removeAccents(e.toLowerCase())
            ) >= 0
        )
      );
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
    <SafeComponent request={statesList}>
      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <Header />
              <OptionsContainer>
                <StateDropdown
                  states={states}
                  //onUpdate={updateFilteredState}
                  onUpdate={updateFilteredAvenuesAndPosts}
                />
                <Input
                  placeholder="¿Qué estás buscando?"
                  value={keyword}
                  //onChangeText={setKeyword}
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
            selectedStateId && <NoFoundResult
              section={{
                data: filteredPosts,
              }}
              valueSearch={keyword}
            />
          }
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
