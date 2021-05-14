import requests
import time
import subprocess
import sys
import os

import json
import mysql.connector

import requests
import datetime
from datetime import date

while True:

	mydb = mysql.connector.connect(host="localhost",user="root", password="12121212",database="tfg")
	mycursor = mydb.cursor()
	mycursor.execute("select * from Solicitud where activada=true")
	parametres=mycursor.fetchall()
	if parametres:	
		pes=parametres[0][2]
		nombre=parametres[0][1]
		#print(nombre)
		#print(pes)
		mycursor.execute("select * from Contenidor where pes>{}".format(pes,nombre))
		myresult=mycursor.fetchall()
		mycursor.execute("select * from Vehicle where lliure=True")
		vehicle=mycursor.fetchall()
		# no vehicle disponible crear + 5 min reserva || evitar que es torni a executar --> executa al moment, de manera q si no hi ha vehicle lliure es queda en bucle fins que el trobi
		if len(myresult)>nombre and vehicle:

			'''
mycursor.execute("select * from Recollida where realitzada=false and date=CURDATE()")
			recollides=mycursor.fetchall()
			if recollides:
				mycursor.execute("select * from Recollida where HOUR(CURRENT_TIME)=HOUR(time)")


			else:
				dataRecollida=date.today().strftime('%Y-%m-%d')
				horaRecollida=(datetime.datetime.now()+datetime.timedelta(minutes = 10)).strftime("%H:%M:%S")'''
			
			dataRecollida=date.today().strftime('%Y-%m-%d')
			#horaRecollida=(datetime.datetime.now()+datetime.timedelta(minutes = 1)).strftime("%H:%M:%S")			
			horaRecollida=(datetime.datetime.now()).strftime("%H:%M:%S")		
			data={}
			data2={}
			data["recollida"]=data2
			data2["date"]=dataRecollida
			data2["time"]=horaRecollida
			data2["idVehicle"]=vehicle[0][0]
			data3=[]
			data["contenidor"]=data3
			for i in myresult:
				info=i[0]
				#print(info)
				data3.append({"id":"{}".format(info)})
			
			print(data)
			
			result= requests.post("http://localhost:3001/addRecollidaSolicitud",json=data)
			time.sleep(300)


	time.sleep(10)

