module.exports = {
  "redirect_uris": [
      "https://pspperfection.trellisfw.io/oauth2/redirect.html"
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
  "client_uri": "https://pspperfection.trellisfw.io/",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
