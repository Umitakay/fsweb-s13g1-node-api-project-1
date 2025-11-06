// SUNUCUYU BU DOSYAYA KURUN

const express = require('express');
const cors = require('cors');

// serveri oluştur
const server = express();

// Middlewareleri tanımla
server.use(express.json());
server.use(cors());




const Users = require('./users/model');
server.get('/', (req, res) => {
    res.status(200).send('API is running')
})
/**
 * USERs GET
 */
server.get('/api/users', (req, res) => {
    try {
        Users.find().then(users => {
            res.status(200).send(users);
        });

    } catch (err) {
        res.status(500).send({ message: "Kullanıcı bilgileri alınamadı" })
    }
})
/**
 * USER CREATE
 */
server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res
            .status(400)
            .send({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" })
    }

    const newUser = Users.insert(req.body);
    newUser.then(user => {
        res.status(201).send(user);
    }).catch(err => {
        res.status(500).send({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    })
})
/**
 * USER GET BY ID
 */
server.get('/api/users/:id', (req, res) => {
    try {
        Users.findById(req.params.id).then(user => {
            if (!user) {
                return res.status(404).send({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
            }
            res.send(user);
        })
    } catch (err) {
        res.status(500).send({ message: "Kullanıcı bilgisi alınamadı" })
    }
})
/**
 * USER DELETE
 */
server.delete('/api/users/:id', (req, res) => {
    try {
        Users.remove(req.params.id).then(user => {
            if (!user) {
                return res.status(404).send({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
            }
            res.send(user);
        })
    } catch (err) {
        res.status(500).send({ message: "Kullanıcı silinemedi" })
    }
})

/**
 *  USER UPDATE
 */

server.put('/api/users/:id', (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            return res
                .status(400)
                .send({ message: "Lütfen kullanıcı için name ve bio sağlayın" })
        }

        Users.update(req.params.id, req.body).then((user) => {
            if (!user) {
                return res.status(404).send({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
            }
            res.send(user);
        })

    } catch (err) {
        res.status(500).send({ message: "Kullanıcı bilgileri güncellenemedi" })
    }
})

module.exports = server; // SERVERINIZI EXPORT EDİN {}
