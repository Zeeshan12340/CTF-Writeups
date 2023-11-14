.globl _start
.intel_syntax noprefix
_start:
	xor    rsi, rsi
	push   rsi
        movabs rdi, 0x68732f2f6e69622f
	push   rdi
	push   rsp
	pop    rdi
	push   0x3b
	pop    rax
	nop
	syscall
