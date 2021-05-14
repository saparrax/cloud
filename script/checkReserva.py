import requests
import time
import subprocess
import sys
import os

import json
import mysql.connector

import requests

#update ubi2 + executada true abans
while True:

	mydb = mysql.connector.connect(host="localhost",user="root", password="12121212",database="tfg")
	mycursor = mydb.cursor()
	mycursor.execute("select * from Reserva where realitzada=false and date=CURDATE() and HOUR(CURRENT_TIME)=HOUR(time) and MINUTE(CURRENT_TIME)=MINUTE(time)")
	myresult=mycursor.fetchall()
	if myresult:
		mycursor.execute("select Reserva.idUbicacio from Reserva where id={}".format(myresult[0][0]))
		myresult2=mycursor.fetchall()

		mycursor.execute("select Reserva.tipus from Reserva where id={}".format(myresult[0][0]))
		myresult3=mycursor.fetchall()

		i=0
		tag=[]
		while i<len(myresult2):
			tag.append(myresult2[i][0])
			print(myresult2[i][0])
			i=i+1

		data={}
		data2={}
		data["service_id"] = "RESERVA"
		data["params"] = data2
		#data2["llistaTag"]="{}".format(tag)
		data2["llistaTag"]="{}".format(tag)
		data2["abocador"]="AB"
		data2["id"] = myresult[0][0]
		data2["tipus"] = myresult3[0][0]
		#json_data=json.dumps(data)

		mycursor.execute("update Vehicle,Reserva set Vehicle.lliure={},Reserva.realitzada={} where Vehicle.id=Reserva.idVehicle and Reserva.id={}".format(False,True,myresult[0][0]))

		mydb.commit()
		
		requests.post("http://147.83.159.198:4321/request_service",json=data)
		print(data)

		#time.sleep(60)
	time.sleep(10)




