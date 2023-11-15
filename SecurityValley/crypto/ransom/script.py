#!/usr/bin/env python3
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from pwn import unhex, p8

IV = unhex('a5bc0616852c6850a422e662db4f36f8')
ciphertext = open('/home/zeeshan/ctf/valley/crypto/ransom/flag.buttlock','rb').read()
for i in range(256):
     key = unhex('df81970d9787afbe97cbe63d3abccdec700c58187c0906e226434f77eeca92')
     key += p8(i)
     # print(f"key is {IV}")
     try:
          cipher = Cipher(algorithms.AES(key), modes.CBC(IV), backend=default_backend())
          decryptor = cipher.decryptor()
          decrypted_padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()
          
          if B'SecVal' in decrypted_padded_plaintext:
               print("Decrypted plaintext (hex):", decrypted_padded_plaintext)
     except Exception as e:
          pass