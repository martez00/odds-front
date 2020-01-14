import SportsRepository from "./SportsRepository";
import OddsRepository from "./OddsRepository";

const repositories = {
    sports: SportsRepository,
    odds: OddsRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};