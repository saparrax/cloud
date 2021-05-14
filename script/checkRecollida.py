import requests
import time
import subprocess
import sys
import os

import json
import mysql.connector

import requests

while True:

	mydb = mysql.connector.connect(host="localhost",user="root", password="12121212",database="tfg")
	mycursor = mydb.cursor()
	mycursor.execute("select * from Recollida where realitzada=false and date=CURDATE() and HOUR(CURRENT_TIME)=HOUR(time) and MINUTE(CURRENT_TIME)=MINUTE(time)")
	myresult=mycursor.fetchall()
	if myresult:
	 mycursor.execute("select Contenidor.idUbicacio from Contenidor,Recollida_Contenidor where Contenidor.id=Recollida_Contenidor.idContenidor and Recollida_Contenidor.idRecollida ={};".format(myresult[0][0]))
	 myresult2=mycursor.fetchall()



	 i=0
	 tag=[]
	 while i<len(myresult2):
	  tag.append(myresult2[i][0])
	  #print(myresult2[i][0])
	  i=i+1


	 arrayCont=[]
	 for i in tag:
	  mycursor.execute("select pes from Contenidor where Contenidor.idUbicacio='{}'".format(i))	
	  pesContenidor=mycursor.fetchall()
	  arrayCont.append([i, pesContenidor[0][0]])

	 ordenados=sorted(arrayCont, key=lambda contenidor: contenidor[1])
	 print("Recollida amb tags:")
	 print(ordenados)

	 array=[[]]

	 cont=0
	 cont_i=0
	 for i in ordenados:
		 if cont+i[1]<=200:
			 cont=cont+i[1]
			 array[cont_i].append(i[0])

		 else: 
			 cont=0
			 cont=cont+i[1]
			 cont_i=cont_i+1
			 array.append([i[0]])



	 data={}
	 data2={}
	 service_id=""
	 if(len(array)>1):
	     service_id="RECOLLIDA_MULTIPLE"
	     data2["llistaTag"]="{}".format(array)
	 else:
	     service_id="RECOLLIDA"
	     data2["llistaTag"]="{}".format(tag)
	 data["service_id"] = service_id
	 data["params"] = data2
	 #data2["llistaTag"]="{}".format(array)
	 data2["abocador"]="AB"
	 data2["id"]=myresult[0][0]
	 #json_data=json.dumps(data)

	 mycursor.execute("update Vehicle,Recollida set Vehicle.lliure={},Recollida.realitzada={} where Vehicle.id=Recollida.idVehicle and Recollida.id={}".format(False,True,myresult[0][0]))

	 mydb.commit()
		
	 requests.post("http://147.83.159.198:4321/request_service",json=data)
	 print(data)
	 print(array)

	time.sleep(1)

