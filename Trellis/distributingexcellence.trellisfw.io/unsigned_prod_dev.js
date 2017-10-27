module.exports = {
  "redirect_uris": [
      "https://abcaudits.trellisfw.io:8080/oauth2/redirect.html"
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
  "client_uri": "https://abcaudits.trellisfw.io/",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
