let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item
    )
    return newData;
}

const SocketServer = (socket) => {

    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({ id: user._id, socketId: socket.id, role: user.role })
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id) || {}
        
        if(users.length > 0){
            users.forEach(client => {
               if(data.id){
                  socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
               } 
            })
        }
    
        users = users.filter(user => user.socketId !== socket.id)
    })

    // Notification
    socket.on('createNotify', msg => {
        if(msg.isAdmin){
            let clients = users.filter(user => user.role === 'admin')
            
            if(clients.length > 0){
              for (let i = 0; i < clients.length; i++) {
                let client = clients[i]
                client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)   
              }  
            }
        }
        else{
            let client = users.find(user => msg.recipients.includes(user.id))
            client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)   
        }
    })

    // Task
    socket.on('createTask', task => {
        let client = users.find(user => task.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createTaskToClient', task.data)
    })

    socket.on('updateTask', task => {
        if(task.isAdmin){
            let clients = users.filter(user => user.role === 'admin')
            
            if(clients.length > 0){
              for (let i = 0; i < clients.length; i++) {
                let client = clients[i]
                client && socket.to(`${client.socketId}`).emit('updateTaskToClient', task.data)   
              }
            }
        }
        else{
            let client = users.find(user => task.recipients.includes(user.id))
            client && socket.to(`${client.socketId}`).emit('updateTaskToClient', task.data)   
        }
    })

    // Salary
    socket.on('createSalary', salary => {
       let client = users.find(user => salary.recipients.includes(user.id))
       client && socket.to(`${client.socketId}`).emit('createSalaryToClient', salary.data)
    })

    // Time off
    socket.on('createTimeoff', timeOff => {
        let clients = users.filter(user => user.role === 'admin')
            
        if(clients.length > 0){
           for (let i = 0; i < clients.length; i++) {
              let client = clients[i]
              client && socket.to(`${client.socketId}`).emit('createTimeoffToClient', timeOff)   
           }  
        }
    })

    socket.on('updateTimeOff', updateTimeOff => {
        let client = users.find(user => updateTimeOff.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('updateTimeOffToClient', updateTimeOff.data)
    })
 
    
    // Users
    socket.on('createDrawback', drawback => {
        let client = users.find(user => drawback.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createDrawbackToClient', drawback.data)
    })

    socket.on('approveRequest', AReq => {    
         let client = users.find(user => AReq.recipients.includes(user.id))
         client && socket.to(`${client.socketId}`).emit('approveRequestToClient', AReq.data)  
    })

    socket.on('userUpdateReq', reqData => {
        let clients = users.filter(user => user.role === 'admin')
            
        if(clients.length > 0){
           for (let i = 0; i < clients.length; i++) {
              let client = clients[i]
              client && socket.to(`${client.socketId}`).emit('userUpdateReqToClient', reqData)   
           }  
        }
    })

    // ONLINE/OFFLINE USER
    socket.on('onlineUser', (data) => {
        socket.emit('checkUserOnlineToMe', users)

        if(users.length > 0){
            users.forEach(user => {
                socket.to(`${user.socketId}`).emit('checkUserOnlineToClient', data._id)
            })
        }
    })
}

module.exports = SocketServer
