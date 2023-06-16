
const getAvatar = (avatar) => {
    let setUrlImage = null;
    if (avatar?.data && avatar?.data.id > 0) {
        if (avatar.data.attributes?.formats && avatar.data.attributes.formats.thumbnail) {
            setUrlImage = avatar.data.attributes.formats.thumbnail.url;
        }
        else if (avatar.data.attributes?.formats && avatar.data.attributes.formats.small)
            setUrlImage = avatar.data.attributes.formats.small.url;
        else if (avatar.data.attributes?.url)
            setUrlImage = avatar.data.attributes.url;
    }

    return setUrlImage;
}

const imagesApiUtils = {
    getAvatar
}

export default imagesApiUtils;