module.exports = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellisfw: {
      _type: 'application/vnd.trellisfw.trellisfw.1+json',
      _rev: '0-0',
      clients: {
        _type: 'application/vnd.trellisfw.clients.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellisfw.client.1+json',
          _rev: '0-0',
          certifications: {
            _type: 'application/vnd.trellisfw.certifications.1+json',
            _rev: '0-0',
            '*': {
              _type: 'application/vnd.trellisfw.certification.globalgap.1+json',
              _rev: '0-0',
              audit: {
                _type: 'application/vnd.trellisfw.audit.globalgap.1+json',
                _rev: '0-0',
              },
              certificate: {
                _type: 'application/vnd.trellisfw.certificate.1+json',
                _rev: '0-0',
              }
            }
          }
        }
      },
      certifications: {
        _type: 'application/vnd.trellisfw.certifications.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellisfw.certification.globalgap.1+json',
          _rev: '0-0',
          audit: {
            _type: 'application/vnd.trellisfw.audit.globalgap.1+json',
            _rev: '0-0',
          },
          certificate: {
            _type: 'application/vnd.trellisfw.certificate.1+json',
            _rev: '0-0',
          }
        }
      }
    }
  }
}
