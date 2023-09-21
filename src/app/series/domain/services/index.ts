import { getProductions, getProductionYears } from './series.service';
import { productionRepository } from '../../infrastructure/index';

const productionRepository_ = new productionRepository();

const getProductionService = getProductions(productionRepository_);
const getProductionYearService = getProductionYears(productionRepository_);

export { getProductionService, getProductionYearService };