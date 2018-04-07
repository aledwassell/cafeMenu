var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

    app.get('/products/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        db.collection('products').findOne(details, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(item)
            }
        })
    })

    app.put('/products/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        const product = {name: req.body.name, description: req.body.description, price: req.body.price};
        db.collection('products').update(details, product, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(item)
            }
        })
    })

    app.post('/products', (req, res) => {
        const product = {name: req.body.name, description: req.body.description, price: req.body.price};
        db.collection('products').insert(product, (e, result) => {
            if(e) {
                res.send({'error' : 'error was found'})
            } else {
                res.send(result.ops[0])
            }

        })
    })

    app.delete('/products/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id' : new ObjectID(id)};
        db.collection('products').remove(details, (e, item) => {
            if(e){
                res.send({'error':'you got an error'})
            } else {
                res.send(`Note ${id} was deleted`);
            }
        })
    })
}