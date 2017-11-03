import {sequence} from 'cerebral'
import { props } from 'cerebral/tags'

import createResource from '../../OADA/factories/createResource';
import doesResourceExist from '../../OADA/factories/doesResourceExist'
import post from '../../OADA/factories/post'
import {oadaDomain} from '../../../config';

function createWebhook({props, state}) {
  /*
    POST to: `_meta/_remote_syncs`:
    {
      "token": "Bearer ggg",
      "url": "bookmarks/trellisfw/certifications",
      "domain": "localhost"
    }
  */
  return post.func(arguments)({
     domain: props.remoteOadaDomain,
     token: props.accessToken,
     path: '/bookmarks/trellisfw/certifications/_meta/_remote_syncs',
     data: {
       token: 'Bearer '+ state.get('UserProfile.user.token'),
       domain: oadaDomain.substr(oadaDomain.indexOf('://')+3),
       url: 'bookmarks/trellisfw/certifications'
     }
  }).then(({response})=> {
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return {remoteWebhookId: id};
  });
}

export default sequence('createCertificationsWebhook', [
  doesResourceExist({
    token: props`accessToken`,
    domain: props`remoteOadaDomain`,
    path: '/bookmarks/trellisfw/certifications'
  }),
  {
    yes: [],
    no: [
      createResource({
        token: props`accessToken`,
        domain: props`remoteOadaDomain`,
        path: '/bookmarks/trellisfw/certifications',
        contentType: 'application/vnd.trellisfw.connection.1+json'
      })
    ]
  },
  createWebhook
])
