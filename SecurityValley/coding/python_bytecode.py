out = ''
constant = 'k\\PbYUHDAM[[VJlVAMVk[VWQE'
key = '8934'
for i in range(len(constant)):
 out += chr(ord(constant[i]) ^ ord(key[i % len(key)]))

print(out)
