module.exports = {
  "redirect_uris": [
      "http://localhost:3000/oauth2/redirect.html",
      "http://localhost:3001/oauth2/redirect.html",
      "http://localhost:3002/oauth2/redirect.html",
      "http://localhost:3003/oauth2/redirect.html",
      "http://localhost:3004/oauth2/redirect.html",
      "http://localhost:3005/oauth2/redirect.html",
      "http://localhost:3006/oauth2/redirect.html",
      "http://localhost:3007/oauth2/redirect.html",
      "http://localhost:3008/oauth2/redirect.html",
      "http://localhost:3009/oauth2/redirect.html",
  ],
  "token_endpoint_auth_method": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "grant_types": [
    "implicit"
  ],
  "response_types": [
    "token",
    "id_token",
    "id_token token"
  ],
  "client_name": "PspPerfection",
  "client_uri": "http://localhost",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
