import os

root = os.getcwd()  # current directory where you run the script

for path, dirs, files in os.walk(root):
    print(f"[DIR]  {path}")
    for d in dirs:
        print(f"   ├─(folder) {d}")
    for f in files:
        print(f"   ├─(file)   {f}")
