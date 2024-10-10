import axios from "axios";
export const uploadImage = async(image) => {
let url = ""
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset","BinHaider");
    const options = {
        method: 'POST',
        body: data,
    };
    await fetch(`https://api.Cloudinary.com/v1_1/dachotsyr/image/upload`, options)
        .then(res => res.json())
        .then(res =>
            url = res.secure_url
        )
        .catch(err => console.log(err));
    return url
}