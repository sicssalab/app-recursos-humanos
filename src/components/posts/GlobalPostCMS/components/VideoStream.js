import { useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';

const VideoStream = ({videoData, autoPlay}) => {
  const video = videoData;
  const videoRef = useRef(null);
  
  const onBuffer = (e) => {
    console.log('bufering..', e);
  };
  
  const onError = (e) => {
    console.log('error rised', e);
  };

  return (
    <Video
      source={{ uri: video.url ? video.url : video }}
      ref={videoRef}
      useNativeControls = {video.url ? false : true}
      resizeMode={ResizeMode.COVER}
      onBuffer={onBuffer}
      onError={onError}
      shouldPlay= {autoPlay}
      style={{ height: video.height ? video.height : 350, width: video.width ? video.width : '100%' }}
    />
  );
};

VideoStream.defaultProps = {
  autoPlay: false
}

export default VideoStream;
