const home = {
    sayHello: (req, res) => {
        res.json({message: "Hello world !"})
    }
}

module.exports = home;