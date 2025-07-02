import sys

def saltear(password: str, salt: str) -> str:
    mid = len(password) // 2
    mixed = (
        salt[:4] +
        password[:mid] +
        salt[4:8] +
        password[mid:] +
        salt[8:]
    )
    return mixed

if __name__ == "__main__":

    input_file = sys.argv[1]
    salt = sys.argv[2]

    print(salt)
    with open(input_file, "r", errors='ignore') as file, open(input_file + "_con_" + salt + ".txt", "w") as fout:
        for line in file:
            password = line.rstrip('\n')
            mixed = saltear(password, salt)
            fout.write(mixed + "\n")