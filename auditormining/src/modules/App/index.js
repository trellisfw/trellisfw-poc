import mounted from './signals/mounted';
import certificationsChanged from './signals/certificationsChanged';
import snackBarClosed from './signals/snackBarClosed';

export default {
  state: {
    model: {
      certifications: {

      }
    },
    view: {
      page: 'login',
      snackBar: {
        message: '',
        open: false
      }
    }
  },

  signals: {
    mounted,
    certificationsChanged,
    snackBarClosed
  },
  modules: {

  },
}
