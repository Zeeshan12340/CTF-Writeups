import base64
import zlib
import os

def xor_apply(data, key):
    decrypted = ''
    for i in range(len(data)):
        decrypted += chr(ord(data[i]) ^ ord(key[i % len(key)]))
    return decrypted

def super_encryption(encrypted_flag):
    key = 'CUwRn048*r$gUuE'
    xored_data = xor_apply(encrypted_flag, key)
    reversed_data = xored_data[::-1]
    compressed_data = zlib.compress(bytes(reversed_data, 'utf-8'))
    encoded_flag = base64.b64encode(compressed_data)
    return encoded_flag

flag_file = 'flag.txt'
if not os.path.exists(flag_file):
    raise FileNotFoundError('Flag file flag.txt not found!')
with open(flag_file, 'r') as file:
    original_flag = file.read().strip()

flag = super_encryption(original_flag)

print('Encrypted Flag:', flag)
