import onClosePressed from './signals/onClosePressed';

export default {
  state: {
    title: '',
    desc: '',
    open: false,
    error: null
  },
  signals: {
    onClosePressed
  }
}
