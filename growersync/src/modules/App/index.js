import mounted from './signals/mounted';
import snackBarClosed from './signals/snackBarClosed';

export default {
	state: {
    model: {
      certifications: {

      }
    },
    view: {
			snackBar: {
        message: '',
        open: false
      }
    }
  },

  signals: {
    mounted,
		snackBarClosed
  },
  modules: {

  },
}
