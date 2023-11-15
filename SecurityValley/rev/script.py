from pwn import *
from itertools import permutations
context.arch = "amd64"

# https://www.youtube.com/watch?v=oeWSWD5avZo
j = ''
f = open("wordlist.txt", "r")
for i in f.readlines():
	io = process(["./license",f"--key=700k-{i.strip()}"])
	if b"checksum for second license key block failed" not in io.recvline():
		j = i
		break
	io.close()


print(f"done at {j}")
io.interactive()
# 700k-0D0v
# 7a46-gD69

# finding key, correct flag was SecVal{go
key = ""
cipher = base64.b64decode("ZARXYEwLP1FWaBMEVUYdG1sBFhw=")
value = "SecVal{"
for i in range(len(value)):
    for j in range(0,256):
        res = cipher[i] ^ j
        if chr(res) == value[i]:
            key += chr(j)
            break

# finding last two
for special in range(47,123):
    key = f'7a46-gD{chr(special)}{chr(special)}'.encode()
    secret = base64.b64decode("ZARXYEwLP1FWaBMEVUYdG1sBFhw=")
    password = ''
    for i, k in enumerate(secret):
        password += chr(k ^ (key[i % len(key)]))
    print(password)

# weird intended solution

solution_range = []
for p in permutations(range(47, 123), 2):
    a,b = p[0], p[1]
    part = f'7a46-gD{chr(a)}{chr(b)}'

    s = 0
    for c in range(len(part)):
        s += ord(key[c])

    if s == 282 and part.isprintable():
        solution_range.append(part)

for block in solution_range:
    print(block)
