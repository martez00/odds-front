import Repository from "./Repository";

const pluralResource = "/odds/";
export default {
    get(params = '') {
        return Repository.get(`${pluralResource}?apiKey=190edbbfe8a66ebd5cd1b3340a03225d${params}`);
    }
};