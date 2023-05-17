import { useState } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import RadioContent from './RadioContent';
import mockEstaciones from "../../../../mocks/mocksEstaciones";

const ModalRadioTabs = (props) => {
  const [stateRadio, setStateRadio] = useState({
    index: 0,
    routes: [
        { key: 'radioView', title: 'Radio' },
        { key: 'podcastView', title: 'Podcast' },
        { key: 'musicView', title: 'Música' },
      ]
  })

  const onPressPlayMusicItem = (type, id) => {
    //TODO regresa el typo play y el id dentro de la lista
    const {onPressPlayMusicItem} = props;
    
    onPressPlayMusicItem && onPressPlayMusicItem(type, id);
  }

  const contentRadioPlay = () => <RadioContent onClick={(response) => onPressPlayMusicItem("radio", response)} items={mockEstaciones.radio.data} />
  const contentPodcastPlay = () => <RadioContent onClick={(response) => onPressPlayMusicItem("podcast", response)} items={mockEstaciones.podcast.data} />
  const contentMusicPlay = () => <RadioContent onClick={(response) => onPressPlayMusicItem("music", response)} items={mockEstaciones.music.data} />

  const onClickTab = (i) => {
    const {onClickTab} = props;
    setStateRadio({
        ...stateRadio,
        index: i,
    })
    onClickTab && onClickTab();
  };

  const renderTabBar = (props) => {
    const renderTabProps = props;
    const inputRange = renderTabProps.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {renderTabProps.navigationState.routes.map((route, i) => {

          return (
            <TouchableOpacity key={i}
              style={styles.tabItem}
              onPress={() => onClickTab(i)}>
              <Animated.Text style={{color: "white"}}
              >{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const renderScene = SceneMap({
    radioView: contentRadioPlay,
    podcastView: contentPodcastPlay,
    musicView: contentMusicPlay,
  });

  return (
    <TabView
      navigationState={stateRadio}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={onClickTab}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    borderBottomColor: "gold",
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    color: "white"
  },
});
export default ModalRadioTabs;
