const epicMail = {
    Message : [ 
        {
            id : 1,
            createdOn : 2018,
            subject : 'Andela Challenge',
            message: 'This is Andela',
            senderId : 2,
            receiverId : 3,
            parentMessageId : 4,
            status : 'sent'
        },
        {
            id : 2,
            createdOn : 2017,
            subject : 'Andela Challenge2',
            message : 'Epic Tower',
            senderId : 3,
            receiverId : 4,
            parentMessageId : 5,
            status : 'read'
        }
        
    ],

    User : [
        {
            id : 1,
            email: 'hayobabson@epicmail.com',
            firstName: 'hayo',
            lastName: 'babson',
            password : 'grammar'
        }
    ]


};

export default epicMail;