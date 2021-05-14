const getConnection = require('../dbconfig');
const fs = require('fs')
const multer = require('multer')
const path =  require('path')
// Load the auth file
const service = require('../services/auth')
const moment = require('moment')
//process.env.TZ = 'Europe/Amsterdam'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/user/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')


const router = app => {
    
	console.log("Validating connection...");
	try {
	    const conn = getConnection()
	    conn.end();
	}
	catch (err){
	    conn.end()
	    console.error("Failed to connect due to error: " + err);
	    return;
	}
  	console.log("Validation succeed!");





  //Log in with a given user and password. Return a token.
  app.post('/login', (request, response) => {
	console.log(request.body)
    const mail = request.body.mail;
    const password = request.body.password;
    if (!mail || !password){
      return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
    }
    const conn = getConnection();
    conn.query("SELECT * FROM Usuari WHERE mail=? AND AES_DECRYPT(UNHEX(contrasenya),'willyrex')=?",[mail,password],(err,res) => {
      if (err) {
        console.error(err);
        conn.end();
        return response.status(500).send({
          message: "error intern del servidor"
        });
      }
      //username doesn't exist
      if (Object.keys(res).length === 0) {
        conn.end();
        return response.status(200).send({
          status: 1,
          message: "credencials incorrectes"
        });
      }
      conn.end();
      //valid authentication
      return response.status(200).send({
        status: 0,
        token: service.createToken(res[0]["id"]), id: res[0]["id"],
				admin: res[0]["admin"]
      });
    });
  });


//Sign up a user with the given params in the body
  app.post('/signup', (request, response) => {
    const password = request.body.contrasenya;
    const name = request.body.nom;
    const lastname = request.body.cognom;
    const phone = request.body.telefon;
    const email = request.body.mail;
		const admin=0

    if (!password || !name || !lastname || !phone || !email){
      return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
    }
    //Request a new connection
    const conn = getConnection()
    //Add the new user
    //admin = 0
    conn.query("INSERT INTO Usuari (nom,cognom,mail,telefon,contrasenya,dataRegistre,admin) VALUES (?,?,?,?,HEX(AES_ENCRYPT(?,'willyrex')), NOW(),?)",[name,lastname,email,phone,password,admin], (err,res) => {
      if (err) {
        console.error(err);
        conn.end();
        return response.status(500).send({
          message: "error intern del servidor"
        });
      }
      conn.end();
      return response.status(201).send({
        status: 0,
        message: "usuari creat correctament"
      });
    });
  });









//API REQUESTS	


	app.get('/', (request, response) => {
    	response.send({
        	message: 'Node.js and Express REST API'
        });
    });

	app.get('/download/:file', (request,response) => {
		let file= request.params.file
		response.download("/etc/agent/codes/"+file)
	});

// GET REQUESTS


	app.get('/Usuari', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Usuari", (err,res) => {
			if(err){
				console.error(err);
				conn.end();
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getContenidors', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Contenidor", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getCategories', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT nom as value FROM Categoria", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getVehicles', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Vehicle", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getCategories2', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Categoria", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getUbicacio', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT TAG as value FROM Ubicacio", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getUbicacions', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Ubicacio", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/contenidor2/:id', (request,response) => {
		const conn= getConnection()
		conn.query("SELECT * FROM Contenidor where id=?",[request.params.id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/categoria2/:id', (request,response) => {
		const conn= getConnection()
		conn.query("SELECT * FROM Categoria where nom=?",[request.params.id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/vehicle2/:id', (request,response) => {
		const conn= getConnection()
		conn.query("SELECT * FROM Vehicle where id=?",[request.params.id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/ubicacio2/:id', (request,response) => {
		const conn= getConnection()
		conn.query("SELECT * FROM Ubicacio where TAG=?",[request.params.id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getProducte/:id', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * FROM Producte where id=?",[request.params.id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/getUsuari', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		conn.query("SELECT * FROM Usuari WHERE id=?", [tokenDecoded.sub], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.send(res);
			conn.end();
		});
	});

	app.get('/porta', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		conn.query("select idProducte from Reserva_Producte where idReserva=?", [request.body.id], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.send(res);
			conn.end();
		});
	});

/////////////

	app.get('/test', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		var x=null
		conn.query("SELECT id FROM Usuari WHERE id=21", (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			x=res[0]['id']
			//response.send(String(res[0]['id']));
			//response.send(String(x))
			//conn.end();
		});
		conn.query("SELECT id FROM Usuari WHERE id=27", (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			//x=res[0]['id']
			//response.send(String(res[0]['id']));
			response.send(String(x)+String(res[0]['id']))
			conn.end();
		});		
	});

/////////////

	app.get('/getHistorial', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Reserva where idUsuari=?",[tokenDecoded.sub], (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	


	app.get('/productesMensuals', (request, response) => {
		const conn= getConnection()
		conn.query("select count(*) as num from Producte,Reserva_Producte,Reserva where Producte.id=Reserva_Producte.idProducte and Reserva_Producte.idReserva=Reserva.id and MONTH(date)=MONTH(CURDATE())", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})


app.get('/reutilitzacioMensuals', (request, response) => {
		const conn= getConnection()
		conn.query("select count(*) as num from Producte,Reserva_Producte,Reserva where Producte.id=Reserva_Producte.idProducte and Reserva_Producte.idReserva=Reserva.id and MONTH(date)=MONTH(CURDATE()) and tipus='reutilitzar'", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})


	app.get('/getHistorial/:id', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Reserva where id=?",[request.params.id], (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	



	app.get('/getProductesReutilitzar', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Producte where disponible=true", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	

	app.get('/getProductes', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Producte", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	

	app.get('/getReserves', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Reserva", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	

	app.get('/Reserva/:id', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		conn.query("SELECT * FROM Reserva WHERE id=?", [request.params.id], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.status(200).send(res);
			conn.end();
		});
	});


	app.get('/getRecollides', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Recollida", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})

	app.get('/Recollida/:id', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		conn.query("SELECT * FROM Recollida WHERE id=?", [request.params.id], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.status(200).send(res);
			conn.end();
		});
	});		


	app.get('/getSolicitud', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		conn.query("SELECT * from Solicitud", (err, res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res)
			conn.end()
			})
	})	 

	app.get('/solicitud2/:id', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		conn.query("SELECT * FROM Solicitud WHERE id=?", [request.params.id], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.status(200).send(res);
			conn.end();
		});
	});	


	app.post('/updateSolicitud', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection();
		const pes=request.body.pes
		const num=request.body.num
		const activada=request.body.activada
		if(!pes || !num) {
			return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
		}
		conn.query("UPDATE Solicitud SET nombreContenidor=?,pesContenidor=?,activada=?", [num,pes,activada], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});		
			}
			response.status(200).send(res);
			conn.end();
		});
	});	

  app.get('/getIpVehicle', (request,response) => {
		const conn= getConnection()
		const id=request.body.id
		const servei=request.body.servei
		if (servei=="RECOLLIDA" || servei=="RECOLLIDA_MULTIPLE"){
		  conn.query("select Vehicle.ip from Vehicle, Recollida where Vehicle.id=Recollida.idVehicle and Recollida.id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res);
			conn.end();
		});


    }else{
		  conn.query("select Vehicle.ip from Vehicle, Reserva where Vehicle.id=Reserva.idVehicle and Reserva.id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send(res);
			conn.end();
			});
		}
	});

		
// POST REQUESTS

	app.post('/sendCode', (request, response) => {
			ip=request.body.ip
			file=request.body.file
			url='scp /etc/agent/codes/{} pi@{}:/etc/agent/codes/'.format(file,ip)
			const { exec } = require('child_process');
			exec(url, (err, stdout, stderr) => {
  		if (err)	console.error(err)
			response.send({
        	message: 'Node.js and Express REST API'
        });
		})
    });

	app.post('/carregaRecollida', (request,response) => {
		const conn= getConnection()
		const idRecollida=request.body.idRecollida
		const idUbicacio=request.body.idUbicacio
		conn.query("SELECT Contenidor.pes from Contenidor where Contenidor.idUbicacio=?", [idUbicacio], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			const pes=res[0]['pes']
			conn.query("UPDATE Contenidor set pes=0 where idUbicacio=?", [idUbicacio], (err,res) => {
				if(err){
					console.error(err);
					return response.status(500).send({message: 'error'});
				}
			});
			conn.query("update Vehicle, Recollida set pes=pes+? where Vehicle.id=Recollida.idVehicle and Recollida.id=?", [pes,idRecollida], (err,res) => {
				if(err){
					console.error(err);
					return response.status(500).send({message: 'error'});
				}
			});
			
			response.status(200).send({message: 'OK'});
			conn.end();
		});
	});

	app.post('/carregaReserva', (request,response) => {
		const conn= getConnection()
		const idReserva=request.body.idReserva
		const idUbicacio=request.body.idUbicacio
		conn.query("select SUM(pes) as pes from Producte,Reserva_Producte where Reserva_Producte.idProducte=Producte.id and idReserva=?", [idReserva], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			const pes=res[0]['pes']
			conn.query("update Vehicle, Reserva set pes=pes+? where Vehicle.id=Reserva.idVehicle and Reserva.id=?", [pes,idReserva], (err,res) => {
				if(err){
					console.error(err);
					return response.status(500).send({message: 'error'});
				}
			});
			
			response.status(200).send({message: 'OK'});
			conn.end();
		});
	});

	app.post('/descarregar', (request,response) => {
		const conn= getConnection()
		const idReserva=request.body.idReserva
		conn.query("update Vehicle,Reserva set Vehicle.pes=0 where Vehicle.id=Reserva.idVehicle and Reserva.id=?", [idReserva], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'OK'});
			conn.end();
		});
	});


	/*app.get('/executaServei', (request,response) => {
		const conn= getConnection()
		const idServei=request.body.idServei
		conn.query("SELECT * FROM Usuari", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
		
		var request = require('request');
		request.post({ url: 'http://localhost:8000/request_service', 
		json: {

    "service_id": "SHORTEST_ROUTE_RESERVA",
    "params": {"llistaTag": "['W3', 'C3']", "abocador": "AB"}
    ,
    "agent_ip" : "localhost"
		}} 
		)

	});


	app.get('/executaReserva', (request,response) => {
		const conn= getConnection()
		const idVehicle=request.body.vehicle
		const idReserva=request.body.reserva
		conn.query("SELECT * FROM Usuari", (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});
*/


	app.post('/abocador', (request,response) => {
		const conn= getConnection()
		const servei=request.body.servei
		const idServei=request.body.idServei
		const lliure=true
		const realitzada=true
    if (servei=="RECOLLIDA"){
		  conn.query("update Vehicle,Recollida set Vehicle.pes=0, Vehicle.lliure=? where Vehicle.id=Recollida.idVehicle and Recollida.id=?", [lliure,idServei], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'OK'});
			conn.end();
		});
			/*
		  conn.query("update Recollida set realitzada=? where id=?", [realitzada,idServei], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'OK'});
			conn.end();
		});*/

		//posar producte disponible
    }else{
			const tipus=request.body.tipus
			if(tipus=="porta"){
				
		  conn.query("select idProducte as id from Reserva_Producte where idReserva=?", [idServei], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}

			res.forEach(function(producte){
			const idProducte=producte.id
			conn.query("UPDATE Producte set disponible=True where id=?", [idProducte], (err,res) =>{

			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});
			})

			});

			}

		  conn.query("update Vehicle,Reserva set Vehicle.pes=0, Vehicle.lliure=? where Vehicle.id=Reserva.idVehicle and Reserva.id=?", [lliure,idServei], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}

			response.status(200).send({message: 'OK'});
			conn.end();

			});
		}

	});

	/*app.post('/addClient', (request, response) => {
		const conn= getConnection()

		const nom= request.body.nom
		const cognom= request.body.cognom
		const mail= request.body.mail
		const telefon= request.body.telefon
		const contrasenya= request.body.contrasenya
		const dataRegistre= request.body.dataRegistre

			conn.query("INSERT INTO Usuari (nom, cognom, mail, telefon, contrasenya, dataRegistre) VALUES (?,?,?,?,?,?)", [nom, cognom, mail, telefon, contrasenya, dataRegistre], (err,res) => {
				if (err){
					console.error(err);
					return response.status(500).send({message: 'error'});
				}

			const id=res.insertId
			conn.query("INSERT INTO Client VALUES (?)", [id], (err,res) => {
				if(err){
					console.error(err);
					return response.send(500).send({message: 'error'});
				}
				
			});
			response.status(200).send({message: '200OK'});
			conn.end();
		});
	});

	app.post('/addGestor', (request, response) => {
		const conn= getConnection()

		const nom= request.body.nom
		const cognom= request.body.cognom
		const mail= request.body.mail
		const telefon= request.body.telefon
		const contrasenya= request.body.contrasenya
		const dataRegistre= request.body.dataRegistre
		const ubicacio=request.body.ubicacio

			conn.query("INSERT INTO Usuari (nom, cognom, mail, telefon, contrasenya, dataRegistre) VALUES (?,?,?,?,?,?)", [nom, cognom, mail, telefon, contrasenya, dataRegistre], (err,res) => {
				if (err){
					console.error(err);
					return response.status(500).send({message: 'error'});
				}
			const id=res.insertId
			conn.query("INSERT INTO Gestor VALUES (?)", [id], (err,res) => {
				if(err){
					console.error(err);
					return response.send(500).send({message: 'error'});
				}
				response.send(res)
			});

			conn.end();
		});
	});*/



	app.post('/addCategoria', (request, response) => {
		const conn= getConnection()
		const nom= request.body.nom
		conn.query("INSERT INTO Categoria VALUES (?)", [nom], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.post('/addUbicacio', (request, response) => {
		const conn= getConnection()
		const tag= request.body.tag
		conn.query("INSERT INTO Ubicacio VALUES (?)", [tag], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});

	app.post('/addContenidor', (request, response) => {
		const conn= getConnection()
		const nom= request.body.nom
		const idUbicacio= request.body.idUbicacio
		const pes= 0
		conn.query("INSERT INTO Contenidor (nom,idUbicacio,pes) VALUES (?,?,?)", [nom,idUbicacio,pes], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			conn.end();
		});
	});


	app.post('/addVehicle', (request, response) => {
		const conn= getConnection()
		const nom= request.body.nom
		const pes=0
		const ip= request.body.ip
		const lliure= true
		conn.query("INSERT INTO Vehicle (nom,pes,ip,lliure) VALUES (?,?,?,?)", [nom,pes,ip,lliure], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(String(res.insertId));
			conn.end();
		});
	});


	app.post('/addReservaPorta', (request, response) => {
		var tokenDecoded = service.decodeToken(request, response)
		console.log(request.body)
		const conn= getConnection()
		const date=request.body.reserva.date
		
		const time=request.body.reserva.time
		//const idVehicle=request.body.reserva.idVehicle
		const idVehicle=request.body.reserva.idVehicle
		const idUbicacio=request.body.reserva.idUbicacio
		const tipus='porta'
		const realitzada=false

		if(!date || !time || !idUbicacio) {
			return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
		}

		var idReserva=null

		conn.query("INSERT INTO Reserva (date,time,idVehicle,idUsuari,idUbicacio,tipus,realitzada) VALUES (?,?,?,?,?,?,?)",	[date,time,idVehicle,tokenDecoded.sub,idUbicacio,tipus,realitzada], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
		idReserva=res.insertId
		})

		const listProducte=request.body.producte

		listProducte.forEach(function(producte){
			const nom=producte.nom
			const pes=producte.pes
			const descripcio=producte.descripcio
			const disponible=false
			const idCategoria=producte.idCategoria
			const idImatge=producte.idImatge

			conn.query("INSERT INTO Producte (nom,pes,descripcio,disponible,idCategoria,idImatge) VALUES (?,?,?,?,?,?)", [nom,pes,descripcio,disponible,idCategoria,idImatge], (err,res) =>{

			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}

			const idProducte=res.insertId
			conn.query("INSERT into Reserva_Producte VALUES (?,?)", [idReserva,idProducte], (err,res) =>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});
			});
		});
		return response.status(200).send({message: 'ok'});
		conn.end()	
});


app.post('/addReservaReutilitzar', (request, response) => {
	var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()

		const date=request.body.reserva.date
		const time=request.body.reserva.time
		//const idVehicle=request.body.reserva.idVehicle
		const idVehicle=request.body.reserva.idVehicle
		const idUbicacio=request.body.reserva.idUbicacio
		const tipus='reutilitzar'
		const realitzada=false

		if(!date || !time || !idUbicacio) {
			return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
		}

		conn.query("INSERT INTO Reserva (date,time,idVehicle,idUsuari,idUbicacio,tipus, realitzada) VALUES (?,?,?,?,?,?,?)",[date,time,idVehicle,tokenDecoded.sub,idUbicacio,tipus, realitzada], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
		
		const id=res.insertId
		const listProducte=request.body.producte

		listProducte.forEach(function(producte){
			const idProducte=producte.id
			const disponible=false
			conn.query("INSERT into Reserva_Producte VALUES (?,?)", [id,idProducte], (err,res) =>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});
			conn.query("UPDATE Producte set disponible=? where id=?", [disponible,idProducte], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});

		})
	response.status(200).send({message: '200OK'});
	conn.end();
	});
});


app.post('/addRecollida', (request, response) => {
	var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		const date=request.body.recollida.date
		const time=request.body.recollida.time
		const realitzada=false	
		//const idVehicle=request.body.recollida.idVehicle
		const idVehicle=request.body.recollida.idVehicle

		if(!date || !time) {
			return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
		}

		conn.query("INSERT INTO Recollida (date,time,realitzada,idUsuari,idVehicle) VALUES (?,?,?,?,?)", [date,time,realitzada,tokenDecoded.sub,idVehicle], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			
		const id=res.insertId
		const listContenidor=request.body.contenidor

		listContenidor.forEach(function(contenidor){
			const idContenidor=contenidor.id
			conn.query("INSERT INTO Recollida_Contenidor VALUES (?,?)", [id, idContenidor], (err,res) =>{

			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});
		})

	conn.end();
	});
});

app.post('/addRecollidaSolicitud', (request, response) => {
		const conn= getConnection()
		const date=request.body.recollida.date
		const time=request.body.recollida.time
		const realitzada=false	
		const idVehicle=request.body.recollida.idVehicle
		const idUsuari=null

		if(!date || !time) {
			return response.status(400).send({
        message: "existeixen camps obligatoris buits"
      });
		}

		conn.query("INSERT INTO Recollida (date,time,realitzada,idUsuari,idVehicle) VALUES (?,?,?,?,?)", [date,time,realitzada,idUsuari,idVehicle], (err,res) => {
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.send(res);
			
		const id=res.insertId
		const listContenidor=request.body.contenidor

		listContenidor.forEach(function(contenidor){
			const idContenidor=contenidor.id
			conn.query("INSERT INTO Recollida_Contenidor VALUES (?,?)", [id, idContenidor], (err,res) =>{

			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			});
		})

	conn.end();
	});
});


//DELETE REQUESTS


	app.delete('/deleteUsuari', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Usuari where id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Usuari eliminat correctament'});
			conn.end();
		});
	});


	app.delete('/deleteReserva', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Reserva where id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Reserva eliminat correctament'});
			conn.end();
		});
	});


	app.delete('/deleteRecollida', (request,response) => {
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Recollida where id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Recollida eliminat correctament'});
			conn.end();
		});
	});

//modi ip
	app.delete('/deleteVehicle', (request,response) => {
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Vehicle where id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Vehicle eliminat correctament'});
			conn.end();
		});
	});

	app.delete('/deleteUbicacio', (request,response) => {
		console.log(request.body)
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Ubicacio where TAG=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Ubicacio eliminada correctament'});
			conn.end();
		});
	});

//modi id
	app.delete('/deleteContenidor', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Contenidor where id=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Contenidor eliminat correctament'});
			conn.end();
		});
	});

	app.delete('/deleteCategoria', (request,response) => {
		var tokenDecoded = service.decodeToken(request, response)
		const conn= getConnection()
		const id=request.body.id
		conn.query("delete from Categoria where nom=?", [id], (err,res) => {
			if(err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			response.status(200).send({message: 'Categoria eliminat correctament'});
			conn.end();
		});
	});

	app.post('/checkHorari',(request,response)=>{
		const conn=getConnection()
		const date=request.body.date
		const time=request.body.time
		
		conn.query("select * from Vehicle where id not in (select Recollida.idVehicle from Recollida where date=? and HOUR(time)=HOUR(?) and MINUTE(time)=MINUTE(?)) and id not in (select Reserva.idVehicle from Reserva where date=? and HOUR(time)=HOUR(?) and MINUTE(time)=MINUTE(?))", [date,time,time, date,time,time], (err,res)=>{
			if (err){
				console.error(err);
				return response.status(500).send({message: 'error'});
			}
			if (Object.keys(res).length === 0) {
        conn.end();
        return response.status(200).send({
          status: 1,
          message: "Hora ocupada api"
        });
      }
		else{
			conn.end();
			return response.status(200).send({ 
				status: 0,
				vehicle: res[0]["id"]
			});
		}

	})
});

//API FOTOS

	app.post('/upload', (req, res) => {
		  //console.log(req)
		fs.writeFile('/home/user/images/' + req.body.name + '.' + req.body.type , req.body.imgsource, 'base64', (err) => {
		  if (err) throw err
		})
		res.status(200)
	})

	app.get('/downloadImage/:file', (req, res) => {
		//console.log('in')
		let file = req.params.file;
		//console.log(file)
		let fileLocation = '/home/user/images/' + file
		res.download(fileLocation, file)
	})

	app.get('/downloadapp', function(req, res){
	   console.log('download apk')
 	  let file = 'TFG.apk'
	  let fileLocation = path.join('./../front/src', file)
	  console.log(fileLocation)
	  res.download(fileLocation, file); // Set disposition and send it.
	});

	app.delete('/delete/:file', (req, res) =>{
		//console.log('in delete')
		let file = req.params.file;
		let fileLocation = '/home/user/images/' + file
		fs.unlink(fileLocation, function() {});
	})

	app.post('/saveImage',(req,res)=>{
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    console.log("ok")
  });

	})



}

// Export the router
module.exports = router;
