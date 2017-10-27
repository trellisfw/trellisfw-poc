module.exports = {
  "redirect_uris": [
      "https://localhost:3000/oauth2/redirect.html",
      "https://localhost:3001/oauth2/redirect.html",
      "https://localhost:3002/oauth2/redirect.html",
      "https://localhost:3003/oauth2/redirect.html",
      "https://localhost:3004/oauth2/redirect.html",
      "https://localhost:3005/oauth2/redirect.html",
      "https://localhost:3006/oauth2/redirect.html",
      "https://localhost:3007/oauth2/redirect.html",
      "https://localhost:3008/oauth2/redirect.html",
      "https://localhost:3009/oauth2/redirect.html",
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
  "client_name": "AbcAudits",
  "client_uri": "https://localhost",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
