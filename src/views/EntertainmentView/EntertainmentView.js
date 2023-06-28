import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SlideStories from "./components/SlideStories/SlideStories";
import SceneName from "../../constants/SceneName";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import { useEffect, useRef, useState } from "react";
import storiesAction from "../../actions/storiesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";
import entertainmentsAction from "../../actions/entertainmentsAction";
import GlobalPostCMS from "../../components/posts/GlobalPostCMS";
import InputSearch from "../../components/form/InputSearch/InputSearch";
import NoFoundResult from "../../components/ui/NoFoundResult/NoFoundResult";
import stringUtils from "../../utils/stringUtils";
const EntertainmentView = () => {
  const navigation = useNavigation();
  const { stories, entertainments } = useGlobalState();
  const [visibles, setvisible] = useState([]);
  const [itemsFilters, setItemsFilters] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.GROUP_PROFILE,
    };
    navigation.navigate(SceneName.GroupProfile, { profilePage }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  const onViewableItemsChanged = useRef(({ viewableItems, _changed }) => {
    setvisible(
      viewableItems.map((item) => {
        return {
          index: item.index,
        };
      })
    );
  });

  useEffect(() => {
    storiesAction.get({}, dispatch);
    entertainmentsAction.getPageInitial({}, dispatch, () => { }, () => { });
  }, []);

  const onSubmitInputSearch = (response) => {
    setSearchValue(response);
    //TODO filtrar los items por el nombre o no se que
    //TODO falta modificar el proceso de como traera la informacion del listado y agregar mas
    setItemsFilters(
      entertainments.data.filter(item =>
        stringUtils.removeAccents(item?.attributes?.urban?.data?.attributes?.name.toLowerCase()).indexOf(
          stringUtils.removeAccents(response.toLowerCase())
        ) >= 0
      )
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      ListHeaderComponentStyle={{ flex: 1 }}
      ListHeaderComponent={
        <>
          {stories.complete && <SlideStories />}
          <View style={{ paddingTop: 20, paddingBottom: 10, paddingHorizontal: 20 }}>
            <InputSearch onSubmit={onSubmitInputSearch} />
          </View>
        </>
      }
      //stickyHeaderIndices={[0,1,2]} //TODO grega como sticky el header y los indices de componentes que sigan
      data={entertainments.complete ?
        searchValue != "" ? itemsFilters : entertainments.data
        : []}
      renderItem={({ item, index }) => {
        const isVisible = visibles.findIndex((i) => i.index == index);
        //isVisible >= 0 && console.log(isVisible, item.name)

        return (
          <GlobalPostCMS
            typePost="post_urban"
            isVisible={isVisible >= 0 ? true : false}
            item={item}
            onNavigateClick={() => onNavigateClick(item)}
          />
        );
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      ListFooterComponent={
        <>
          {entertainments.loading && <View><Text style={{ color: "white" }}>loading...</Text></View>}
          {searchValue != "" && itemsFilters.length <= 0 && <NoFoundResult
            section={{
              data: itemsFilters,
            }}
            valueSearch={searchValue}
          />}
        </>
      }
    />
  );
};

export default EntertainmentView;
