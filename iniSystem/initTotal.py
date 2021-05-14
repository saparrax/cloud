import subprocess
import os

os.system("npm --prefix /home/user/front/ start & node /home/user/api/app.js & python3 /home/user/script/checkRecollida.py & python3 /home/user/script/checkReserva.py & python3 /home/user/script/solicitudAutomatica.py")
os.system("killall python3")
