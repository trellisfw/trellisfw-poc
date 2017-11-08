function watchCertifications({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/trellisfw/certifications',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }, 'App.certificationsChanged');
}

export default [
  watchCertifications
]
