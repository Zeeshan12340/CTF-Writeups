#/usr/bin/python3
from argparse import ArgumentParser
from sympy import mod_inverse, prime

# python3 solve.py -m dec -t '[5129, 10327, 42284, 57695, 5730, 64016, 31008, 40005, 63768, 46371, 7692, 48194, 9075, 32422, 35191, 63230]'
def get_keys():
    p, q = prime(50), prime(60)
    n = p * q
    phi = (p-1)*(q-1)
    e = 47

    return e, n, phi

def encrypt_msg(msg):
    e, n, _ = get_keys()
    enc_msg = [(ord(i) ** e) % n for i in msg]

    return enc_msg

def decrypt_msg(enc_msg):
    e, n, phi = get_keys()
    d = mod_inverse(e, phi)
    dec_msg = ''.join([chr((i ** d) % n) for i in enc_msg])

    return dec_msg

def main(args):
    if args.mod == "enc":
        print(encrypt_msg(args.text))
    elif args.mod == "dec":
        enc_msg = eval(args.text)
        dec_msg = decrypt_msg(enc_msg)
        print(dec_msg)
    else:
        print("Unknown mode...")

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-t", "--text", dest="text", type=str)
    parser.add_argument("-m", "--mode", dest="mod", required=True)

    args = parser.parse_args()

    main(args)
