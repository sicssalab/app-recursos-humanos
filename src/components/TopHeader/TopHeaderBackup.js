import React, { useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Image } from 'react-native';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/general/search.svg';
import RadioIcon from '../../assets/icons/stream/podcasts.svg';
import ModalRadio from '../../components/modals/ModalRadio';

import {
  Container,
  SearchIconWrapper,
  LogoWrapper,
  LeftSide,
  RightSide,
} from './styles';

const TOP_HEIGHT = 60;

export const useTopHeaderStyle = () => {
  const { top } = useSafeAreaInsets();

  return {
    paddingTop: top,
    height: top + TOP_HEIGHT,
  };
};

function TopHeaderBackup() {
  const themeContext = useContext(ThemeContext);
  const style = useTopHeaderStyle();
  const [playMusic, setPlayMusic] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //TODO proceo de musica
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());
  //TODO ENDproceo de musica

  const onShowModal = () => {
    setShowModal(!showModal);
  };


  //TODO proceo de musica
  const PlayAudio = async () => {
    //await sound.playAsync();
    try {
      //TODO error bug radio playlist play
      const result = await sound.current.getStatusAsync();
      setPlayMusic(true);
      // if (result.isPlaying === false) {
      //   sound.current.playAsync();
      // }
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.error(error, 'func play audio');
    }
  };
  const PauseAudio = async () => {
    try {
      setPlayMusic(false);
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.error(error, 'func pasuse audio');
    }
  };
  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        //console.log('entrar a cargar el audio');
        const result = await sound.current.loadAsync(
          require('../../assets/music/Here-it-Comes-TrackTribe2.mp3'),
          {},
          true,
        );

        if (result.isLoaded === false) {
          SetLoading(false);
          console.error('Error in Loading Audio');
        } else {
          // console.log(
          //   'cargo el video quita el loagind y dice que Loaded cargado video es true',
          // );
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.error(error, ' func load audio');
        SetLoading(false);
      }
    } else {
      // console.log('tiene audio activo por lo que no cargara uno nuevo');
      // console.log('crear nuevo audio');
      SetLoading(false);
    }
  };
  React.useEffect(() => {
    LoadAudio();
  }, []);
  //TODO ENDproceo de musica

  return (
    <Container style={[style]}>
      <LeftSide>
        <LogoWrapper>
          <Image
            source={require('../../assets/images/HolaTelcel.png')}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: 'contain',
            }}
          />
        </LogoWrapper>
      </LeftSide>
      <RightSide>
        <SearchIconWrapper>
          <SearchIcon fill={themeContext.colors.text} />
        </SearchIconWrapper>
        <TouchableOpacity activeOpacity={1} onPress={onShowModal}>
          <RadioIcon fill={themeContext.colors.text} />
        </TouchableOpacity>
      </RightSide>
      <ModalRadio
        modalVisible={showModal}
        Loading={Loading}
        Loaded={Loaded}
        playMusic={playMusic}
        // onPlayMusic={onPlayMusic}
        // onPauseMusic={onPauseMusic}
        
        onClose={onShowModal}
        onPlayAudio={PlayAudio}
        onPauseAudio={PauseAudio}
      />
    </Container>
  );
}

export default TopHeaderBackup;
