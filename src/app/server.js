import { belongsTo, createServer, Factory, hasMany, Model } from 'miragejs'

export default createServer({
    models: {
        user: Model.extend({
            chatbox: hasMany(),
            messenger: hasMany(),
            user: hasMany(),
        }),
        chatbox: Model.extend({
            user: hasMany(),
            messenger: hasMany()
        }),
        messenger: Model.extend({
            chatbox: belongsTo(),
            user: belongsTo()
        })
    },

    factories: {
        user: Factory.extend({
            name(i) {
                return `User ${i}`
            },
            age() {
                return Math.floor(Math.random()*50)
            },
            phone() {
                return Math.floor(Math.random()*(9999999999 - 1000000000 + 1)) + 1000000000
            }
        })
    },

    seeds(server) {

        const mes1 = server.create('messenger', {messenger: 'Hello', date: new Date()})
        const mes2 = server.create('messenger', {messenger: 'Hi!', date: new Date()})
        const mes3 = server.create('messenger', {messenger: 'What is your name?', date: new Date()})
        const mes4 = server.create('messenger', {messenger: 'My name is Bia', date: new Date()})
        const mes5 = server.create('messenger', {messenger: 'I am Tien', date: new Date()})

        const user1 = server.create('user')
        const user2 = server.create('user')
        const user3 = server.create('user')
        
        const chatbox1 = server.create('chatbox', {
            name: 'A25 FootbalClub',
            messenger: [mes1, mes2, mes3, mes4, mes5]
        })
        const chatbox2 = server.create('chatbox', {
            name: 'Fan Girls',
            messenger: []
        })

        const user4 = server.create('user', {
            name: 'Tien Ha',
            email: 'viettien@gmail.com',
            password: '123456',
            phone: '0905905246',
            chatbox: [chatbox1, chatbox2],
            messenger: [mes1, mes3, mes5],
            user: [user1, user3]
        })
        const user5 = server.create('user', {
            name: 'Bia Ha',
            email: 'biaha@gmail.com',
            password: '123456',
            phone: '0903561379',
            chatbox: [chatbox1],
            messenger: [mes2, mes4],
            user: [user2, user3, user4]
        })
        const user6 = server.create('user', {
            name: 'Trung',
            email: '123@gmail.com',
            password: '123456',
            phone: '1234567891',
            chatbox: [chatbox1, chatbox2],
            messenger: [],
            user: [user1, user2, user4, user5]
        })
    },

    routes() {
        this.namespace='api'

        // Users
        this.get('/users', (schema) => {
            return schema.users.all()
        })

        this.get("/users/:id", (schema, request) => {
            let id = request.params.id
            
            return schema.users.find(id)
        })

        this.post('/users', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
    
            return schema.users.create(attrs)
        })

        this.patch('/users/:id', (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody);
            let id = request.params.id;
    
            return schema.users.find(id).update(newAttrs);
        });

        // Users > Users

        this.get('/users/:id/users', (schema, request) => {
            let user = schema.users.find(request.params.id)

            return user.user
        })

        // Users > Chatboxes

        this.get('/users/:id/chatboxes', (schema, request) => {
            let user = schema.users.find(request.params.id)

            return user.chatbox
        })

        // Users > Messengers

        this.get('/users/:id/messengers', (schema, request) => {
            let user = schema.users.find(request.params.id)

            return user.messenger
        })

        // Chatboxes

        this.get('/chatboxes', (schema) => {
            return schema.chatboxes.all()
        })

        this.get("/chatboxes/:id", (schema, request) => {
            let id = request.params.id
            
            return schema.chatboxes.find(id)
        })

        this.post('/chatboxes', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
    
            return schema.chatboxes.create(attrs)
        })

        this.patch('/chatboxes/:id', (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody);
            let id = request.params.id;
    
            return schema.chatboxes.find(id).update(newAttrs);
        });

        this.delete('/chatboxes/:id', (schema, request) => {
            let id = request.params.id
            
            return schema.chatboxes.find(id).destroy()
        })

        // Chatboxes > Messengers

        this.get("/chatboxes/:id/messengers", (schema, request) => {
            let chatbox = schema.chatboxes.find(request.params.id)
            
            return chatbox.messenger
        })
        
        // Chatboxes > Users

        this.get("/chatboxes/:id/users", (schema, request) => {
            let chatbox = schema.chatboxes.find(request.params.id)
            
            return chatbox.user
        })

        // Messengers
        
        this.get('/messengers', (schema) => {
            return schema.messengers.all()
        })

        this.get("/messengers/:id", (schema, request) => {
            let id = request.params.id
            
            return schema.messengers.find(id)
        })

        this.post('/messengers', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
    
            return schema.messengers.create(attrs)
        })

        this.patch('/messengers/:id', (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody);
            let id = request.params.id;
    
            return schema.messengers.find(id).update(newAttrs);
        });

        this.delete('/messengers/:id', (schema, request) => {
            let id = request.params.id
            
            return schema.messengers.find(id).destroy()
        })
        // Messengers > User

        this.get('/messengers/:id/user', (schema, request) => {
            let messenger = schema.messengers.find(request.params.id)
            
            return messenger.user
        })


    }
})