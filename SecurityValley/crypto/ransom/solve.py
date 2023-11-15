#!/usr/bin/env python3

import sys
from Crypto.Cipher import AES
import glob
from scipy.stats import entropy
import warnings

warnings.filterwarnings("ignore")

# test for aes cbc encryption with given bytes
def test_aes_cbc(data, key, iv):
	try:
		aes_cipher = AES.new(key, AES.MODE_CBC, iv)
		recover = aes_cipher.decrypt(data)
		print(recover.decode('utf-8'))
		sys.exit(1)
	except Exception as e:
		pass


# open encrypted flag file
def read_encrypted_file():
	with open('flag.buttlock', 'rb') as f:
		return f.read()

# read mem dump files
def read_input_file():
	for file in glob.glob("*.page"):
		yield file


# scan bytes
def read_byte_parts(n, dump):
	with open(dump, 'rb') as input:
		start_index = 0
		while True:
			input.seek(start_index)
			data = input.read(n)
			if len(data) < n:
				break
			start_index += 1
			yield data

def main():
	# read encrypted flag
	encrypted_flag = read_encrypted_file()
	IV = bytes.fromhex('a5bc0616852c6850a422e662db4f36f8')

	# read mem dump files
	for dump in read_input_file():
		# read bytes
		for part in read_byte_parts(32, dump):
			# test for aes cbc encryption
			e = entropy(bytearray(part))
			if e > 3.0:
				print("\rKEY: {} | ENT: {}".format(part.hex(), e), end="")
			sys.stdout.flush()
			test_aes_cbc(encrypted_flag, part, IV)

if __name__ == '__main__':
	main()
