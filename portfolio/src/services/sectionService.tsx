import http from "../http-common";
import SectionData from "../types/sectionData";

const get = (title: string) => {
    return http.get(`section/getSection/${title}`);
}

const update = (title: string, data: SectionData) => {
    return http.put(`section/updateSection/${title}`, data);
}

const create = (data: SectionData) => {
    return http.post("section/addSection", data);
}

const remove = (title: string) => {
    return http.delete(`section/deleteSection/${title}`);
}

const SectionService = {
    get,
    update,
    create,
    remove
}

export default SectionService;