# data = [0x1c, 0xe0, 0xe8, 0xd5, 0x11, 0x14, 0xea, 0xef, 0x17, 0xe8, 0xe9, 0x1e, 0x18, 0xe7, 0xe9, 0xe2, 0x10, 0x1a, 0xe3, 0x1c, 0xeb] # pwn.college{practice}
data = [0x06, 0xf6, 0x3c, 0x2a, 0xe9, 0x0d, 0x2b, 0x0f, 0xd4, 0x1a, 0x0e, 0xe4, 0x2d, 0xe1, 0x0a, 0x15, 0x13, 0xd0, 0x19, 0xd9, 0x17, 0xfd, 0xeb, 0xdb, 0xe5, 0xe4, 0xec, 0xe0, 0x1d, 0x23, 0xe6, 0xf3, 0x0c, 0xf6] # flag

# data = [0x06, 0x09, 0xf6, 0xea, 0xe4, 0xe2, 0xe2, 0x1e, 0x14, 0xe3, 0xe6, 0xe1, 0xe5, 0xe2, 0x1c, 0xe3, 0x1a, 0x10, 0xe2, 0xe9, 0xe7, 0x18, 0x1e, 0xe9, 0xe8, 0x17, 0xef, 0xea, 0x14, 0x11, 0xd5, 0xe8, 0xe0, 0x1c]
size = len(data)
# three encoding loops - go in reverse order to decrypt

# third loop
data = data[::-1]

# second loop
for i in range(100):
	result = i
	if i >= size:
		break

	for j in range(8, -1, -1):
		if ((data[i] >> j) & 1) != 0:
			data[i] ^= 1 << (j+1)

	data[i] ^= 0xaa

# first loop
for i in range(100):
	result = i
	if i >= size:
		break
	
	data[i] = ~data[i]
	data[i] ^= i + 1

	while data[i] < 0:
		data[i] += 256

print(data)
print("".join(chr(i) for i in data))