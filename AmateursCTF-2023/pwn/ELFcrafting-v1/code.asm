[bits 64]
file_load_va: equ 4096 * 40

db 0x7f, 'E', 'L', 'F'
db 2
db 1
db 1
db 0

; We'll overwrite the EABI field + 7 bytes padding with our first 8 bytes of
; code. (I checked ahead of time that these instructions take exactly 8 bytes.)
entry_point:
  mov eax, 59
  nop

  ; Skip to the next place we can clobber with our code, since we can't clobber
  ; the next field (the ELF type).
  jmp code_chunk_2

dw 2
dw 0x3e
dd 1
dq entry_point + file_load_va
dq program_headers_start

; We'll next overwrite the 8-byte section header offset field, as well as the
; 4-byte "flags" field that follows it.
code_chunk_2:
  mov edi, file_load_va + message
  nop
  nop
  nop
  nop
  syscall
db 0 
; maybe padding

dw 64
dw 0x38
dw 1
dw 0x40
dw 0
dw 0

program_headers_start:
dd 1
dd 5
dq 0
dq file_load_va

; We'll overwrite the 8-byte "physical address" field in the program header
; with our final 8 bytes of code. These four instructions take exactly 8 bytes.
dq file_load_va

dq file_end
dq file_end

; We can clobber the final 8-byte "alignment" field in the program header, and
; we'll overwrite it with the first 8 bytes of our "Hello, world!" string.
message: db `/bin/sh\0`

file_end:
