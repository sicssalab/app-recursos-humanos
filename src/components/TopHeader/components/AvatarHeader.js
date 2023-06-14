import { useEffect, useState } from "react";
import { useGlobalState } from "../../../context/StoreProvider";
import { Image } from "react-native";

const AvatarHeader = (props) => {
    const { userAuth } = useGlobalState();
    const [urlImage, setUrlImage] = useState("");
    useEffect(() => {
        if(userAuth.avatar?.data && userAuth.avatar?.data.id > 0) {
            if(userAuth.avatar.data.attributes?.formats && userAuth.avatar.data.attributes.formats.thumbnail)
                setUrlImage(userAuth.avatar.data.attributes.formats.thumbnail.url);
            else if(userAuth.avatar.data.attributes?.formats && userAuth.avatar.data.attributes.formats.small)
                setUrlImage(userAuth.avatar.data.attributes.formats.small.url);
            else if(userAuth.avatar.data.attributes?.url)
                setUrlImage(userAuth.avatar.data.attributes.url);
        }
    },[userAuth])
    return (<Image
        source={userAuth.avatar?.data != null ? urlImage: require("../../../assets/images/placeholder.png")}
        style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            marginLeft: 4
        }}
    />);
}

export default AvatarHeader;