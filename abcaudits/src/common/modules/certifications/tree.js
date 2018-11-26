module.exports = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellis: {
      _type: 'application/vnd.trellis.trellis.1+json',
      _rev: '0-0',
      clients: {
        _type: 'application/vnd.trellis.clients.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellis.client.1+json',
          _rev: '0-0',
          certifications: {
            _type: 'application/vnd.trellis.certifications.1+json',
            _rev: '0-0',
            '*': {
              _type: 'application/vnd.trellis.certification.globalgap.1+json',
              _rev: '0-0',
              audit: {
                _type: 'application/vnd.trellis.audit.globalgap.1+json',
                _rev: '0-0',
              },
              certificate: {
                _type: 'application/vnd.trellis.certificate.1+json',
                _rev: '0-0',
              }
            }
          }
        }
      },
      certifications: {
        _type: 'application/vnd.trellis.certifications.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellis.certification.globalgap.1+json',
          _rev: '0-0',
          audit: {
            _type: 'application/vnd.trellis.audit.globalgap.1+json',
            _rev: '0-0',
          },
          certificate: {
            _type: 'application/vnd.trellis.certificate.1+json',
            _rev: '0-0',
          }
        }
      }
    }
  }
}
