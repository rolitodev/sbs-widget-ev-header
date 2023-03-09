import { sortByApplicationCode } from '../assets/helper';

export default {
  // eslint-disable-next-line max-len
  getAplicationsByLevel: (state) => (levelCode) => state.availableApplications.filter((item) => item.level === levelCode).sort(sortByApplicationCode),
};
