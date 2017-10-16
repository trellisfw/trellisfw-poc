import {sequence} from 'cerebral'
import doesResourceExist from '../../OADA/factories/doesResourceExist';
import createResource from '../../OADA/factories/createResource';

export default sequence('initFpadResource', [
  doesResourceExist({path: '/bookmarks/fpad'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/fpad',
        contentType: 'application/vnd.fpad.1+json'
      })
    ]
  }
])
