import http from "../http-common";
import TatetiData from "../types/tatetiData";

const getAll = () => {
    return http.get(`tateti/getAllData`);
}

const post = (data: TatetiData) => {
    return http.post("tateti/addTaTeTi", data);
}

const getWinsPlayer  = (player: string) => {
    return http.get(`tateti/getAllWinsByPlayer/${player}`);
}

const TaTeTiService = {
    getAll,
    post,
    getWinsPlayer
}

export default TaTeTiService;