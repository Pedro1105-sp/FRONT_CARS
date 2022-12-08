const { response } = require("express");
const express = require("express");

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');


// app.get("/", async(req, res)=>{
//     res.render("index")
// });

// app.get("/listagemFabricantes", async(req, res)=>{
//     res.render("fabricante/index")
// });

app.get("/", async(req, res)=>{
    const urlListarFabricantes = "http://localhost:3008/listarFabricantes";

     axios.get(urlListarFabricantes)
     .then(
         (response)=>{
            let fabricantes = response.data;
            res.render("fabricante/index", {fabricantes})
         }
     )

});

app.post('/inserirFabricante', (req, res)=>{
    const urlInserirFabricantes = 'http://localhost:3008/inserirFabricantes';
    
    

    axios.post(urlInserirFabricantes, req.body)
    .then(
        res.redirect("fabricante/index", {fabricantes})
    )

});

app.get('/formEdicaoFabricantes/:id', (req, res)=>{
        
    let {id} = req.params;
    
    const urlListarFabricante = `http://localhost:3008/listarFabricante/${id}`;
    
    axios.get(urlListarFabricante)
    .then(
        (response)=>{

            let fabricante = response.data;
            res.render("fabricante/editarFabricantes", {fabricante});

        }
    )
});

app.get('/excluirFabricante/:id', (req, res)=>{

	let {id} = req.params;

	const urlExcluirFabricante = 
	`http://localhost:3008/excluirFabricante/${id}`;
	
	axios.delete(urlExcluirFabricante)
	.then((response)=>{

		const urlListarFabricante = 
		'http://localhost:3008/listarFabricantes';
		

		axios.get(urlListarFabricante)
		.then((response)=>{
			let fabricantes = response.data;
			res.render('fabricante/index', {fabricantes});
		});

	})

});

app.listen(3001, ()=>{
    console.log('SERVIDOR FRONT EM: http://localhost:3001');
});