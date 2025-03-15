import { v2 } from 'cloudinary';
import configs from "../configs/index.configs.js";

v2.config({
    cloud_name: configs.CLOUD_NAME,
    api_key: configs.CLOUD_API_KEY,
    api_secret: configs.CLOUD_API_SECRET
});

export default v2;