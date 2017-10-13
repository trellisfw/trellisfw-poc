How to logout of OAuth:
----
 - Go to: https://api.abcaudits.fpad.io/oadaauth/logout


---


gary@ABCAudits
----
  token: `kPqcRbdK01m7nEDAn9NBgdEmD1Q0t_PB4UdxSsGE`
  username: `gary`

gary@GrowerSync
---
  token: `ggg` or `igwCXHgNZd243b7AH2AoXEdbC9bSxkxz-FGRNCxN`
  username: `gary@gmail.com`



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
