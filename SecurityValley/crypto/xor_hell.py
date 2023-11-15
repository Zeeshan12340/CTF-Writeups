#/usr/bin/python3

def read_flag_from_disk():
    with open("./challenge.txt") as flag:
        return bytes.fromhex(flag.read().strip())

def xor(flag, key):
    out = b""

    for i in range(len(flag)):
        out += bytes([flag[i] ^ key[i % len(key)]])

    return out

def main():    
    res = xor(
        read_flag_from_disk(),
        b"0"
    )

    print(res)

if __name__ == "__main__":
    main()


# solve, key is 'omg'
cipher = bytes.fromhex('3c0804390c0b1415571d321307083807080b0332081a1938000b381602124e10')
for i in range(256):
	out = b''
	key = [111, 109, 103, 111, 109, 103]
	for j,k in enumerate(cipher):
		out += bytes([k ^ key[j % len(key)]])
	if chr(out[4]) == 'a':
		print(f"found key value: {i} and out is: {out.decode()}")
		break
