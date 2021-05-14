import subprocess

subprocess.run("python3 /home/user/script/checkRecollida.py & python3 /home/user/script/checkReserva.py & python3 /home/user/script/solicitudAutomatica.py",shell=True)
