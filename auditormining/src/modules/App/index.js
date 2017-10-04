import mounted from './signals/mounted';
import certificationsChanged from './signals/certificationsChanged';

export default {
  state: {
    model: {
      certifications: {

      }
    },
    view: {
      page: 'login'
    }
  },

  signals: {
    mounted,
    certificationsChanged
  },
  modules: {

  },
}
