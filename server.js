const express = require('express')
const nunjucks = require('nunjucks')


/*Chamar a função pra dentro do servidor*/

const server = express()
const videos = require('./data')

/*Usando arquivos staticos*/
server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


/*Adicionar a rota*/
server.get("/", function(req, res) {

    const about = {
        avatar_url: "/denisjesus.png",
        name: "Dênis de Jesus",
        role: "Aluno- Rocketseat",
        description: 'Programador full-stack, focado em aprender o conteúdo ensinado e transmitindo na <a href="https: //rocketseat.com.br/" target="_blank">Rocketseat',
        links: [
            { name: "Github", url: "https://github.com/DenisJesusBatista" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/d%C3%AAnis-jesus-a15a9a35/" }
        ]
    }

    return res.render("about", { about })

})

/*Adicionar a rota*/
server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })

})


server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id

    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})


/*Iniciar o servidor*/
server.listen(5000, function() {
    console.log("server is running")

})