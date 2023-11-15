import base64

# EhYXCgQIDkEHAxVEIVtLNxIBEBJLAwgHBgQSTSUBEQoQDRFLJA0FBU8QGhU= says
# pwshell cat C:/Users/aicdev/Desktop/Flag.txt
# after this command, grab the two unique strings
# EhYXCgQIDkETCg4FDwg= says
# pwshell whoami
out = ''
constant = base64.b64decode("ISotLCY7ICg2Jhxp")
key = 'bad'
for i in range(len(constant)):
 out += chr(constant[i] ^ ord(key[i % len(key)]))

print(out)
# CKING_BIRD}

out = ''
constant = base64.b64decode("0xAAMQQHNAAIGSwr")
key = 'bad'
for i in range(len(constant)):
 out += chr(constant[i] ^ ord(key[i % len(key)]))

print(out)
# ±qdSecVal{MO
# SecVal{MOCKING_BIRD}
