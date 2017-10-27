module.exports = {
  "redirect_uris": [
      "https://retailfresh.trellisfw.io/oauth2/redirect.html"
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
  "client_name": "RetailFresh",
  "client_uri": "https://retailfresh.trellisfw.io/",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
