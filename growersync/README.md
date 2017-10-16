
TODO:
---
    - Load everything after login (not just on app mounted)
    - Fix Year panel in UI
    - Add Sam's CertCard for displaying certs once it is complete.
    - Change `loadCertifications` to load .audit once new data structure is complete.

    - Merge audits in UI based on (what are the determining factors again?)
      - This component will wrap Sam's CertCard

    - Websockets to GrowerSync /bookmarks/fpad/certifications

    - Test with alexs new webhooks
      - Turn back on /certifications creation

    - Add logout code `let img = (new Image()).src = domain+"/oadaauth/logout";`

    - Have connections resolve oada domain from well-known
    - Add logos/names to connection list (hardcode) based on url

    - Pull authorizated apps list from GET @ /authorizations
      - Fill in info from software statement
      - Don't show expired apps (time is in seconds)

    - Add delete button for new connections
    - Add delete button for existing connections
      - Delete the webhook (how to do this? I don't have a token to delete from other cloud. Ask for permission again?)
      - Delete the webhook from /bookmarks/fpad/connections

    - Before create webhook (alexes) POST to /authorizations to get scoped token
      to use in webhook (for token) so webhook does not have SUPER access.



    - Why does libs/oada-lib-arangodb/libs/exampledocs/users.js have gary under frank2 oidc???

How to logout of OAuth:
----
 - Go to: https://api.abcaudits.fpad.io/oadaauth/logout
---


Webhooks
---
- POST to: `_meta/_syncs`:
    {
      "oada-put": true,
      "headers": {
        "Authorization": "Bearer ggg"
      },
      "url": "https://localhost/bookmarks/fpad/certifications"
    }


Sync
---

alex said you just post to `/_meta/_remote_syncs` with a `url` (e.g., `/bookmarks/fpad`), `domain`, `token`
