import axios from "axios";
export default (axiosProxy = data => axios({ method: "POST", url: "https://py.yuyuko.me/axios", data }));
