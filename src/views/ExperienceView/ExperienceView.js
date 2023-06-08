import React, { useEffect, useRef, useState } from "react";
import { FlatList, SectionList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeComponent } from "../../components";
import Divider from "../../components/Divider";
import SceneName from "../../constants/SceneName";
import GlobalPost from "../../components/posts/GlobalPost";
import StateDropdown from "../AvenuesView/components/StateDropdown";
import { Container, OptionsContainer } from "../AvenuesView/styles";
import { Header } from "./components/Header";
import ServicesDropdown from "./components/ServicesDropdown";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import experiencesAction from "../../actions/experiencesAction";
import experiencesStatesAction from "../../actions/experiencesStatesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";

function Component() {
  const navigation = useNavigation();
  const { experiences } = useGlobalState();
  const dispatch = useDispatch();
  const [visibles, setvisible] = useState([]);

  useEffect(() => {
    experiencesAction.get({}, dispatch);
  }, []);

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.SERVICES_PROFILE,
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
    <SafeComponent request={experiences}>
      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Header />
          }
          data={experiences.complete ? experiences.data : []}
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
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
