import base64
import zlib
import os

def xor_apply(data, key):
    decrypted = ''
    for i in range(len(data)):
        decrypted += chr(ord(data[i]) ^ ord(key[i % len(key)]))
    return decrypted

encrypted_flag = open("flag.enc").read()
key = 'CUwRn048*r$gUuE'

decoded_flag = base64.b64decode(encrypted_flag[:-1])

decompressed_flag = zlib.decompress(decoded_flag).decode()

decompressed_flag = decompressed_flag[::-1]

flag = xor_apply(decompressed_flag, key)

print(f"{flag=}")