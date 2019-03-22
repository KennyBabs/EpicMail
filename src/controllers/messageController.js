import db from '../models/dbmodel';

class MessageController {
  static async createMessage(req, res) {
    const { email } = req.body;
    
    let userInfo = [];
    const selectOneMail = 'SELECT * FROM users WHERE email=$1';
    
//======check if email exist=======================
    if (req.body.email) {
      try {
        const { rows } = await db.query(selectOneMail, [email]);
        userInfo = rows[0];
        if (!userInfo) {
          return res.status(409).send({
            status: 'error',
            error : 'Email does not exist' });
        }
        const text = `
            INSERT INTO messages(email, subject, message, status, senderId, recieverId, parentMessageId, group_reciever, group_status)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
            returning *`;
        const values = [
          req.body.email,
          req.body.subject,
          req.body.message,
          'unread',
          req.user.id,
          userInfo.id,
          null,
          null,
          'false',
        ];
          const { rows: result } = await db.query(text, values);
          return res.status(201).send({
            status: 'success',
            data : result[0]
          });
        } catch (error) {
          return res.status(400).send(error);
        }
      }
    }

  static async getAllMessages(req, res) {
    let result = [];
    const messages = 'SELECT * FROM messages WHERE recieverId=$1';
    try {
      const { rows } = await db.query(messages, [req.user.id]);
      result = rows;
      if (!result) {
        return res.status(404).send({
          status : 'error',
          error: 'messages not Found' 
        });
      }
      return res.status(200).send({
        status: 'success',
        data: result,
      });
    }
    catch (e) {
      return res.status(500).send({ 
        status : 'error',
        error: 'Server Error' 
      });
    }
}

  static async getAMessage(req, res) {
    let result = [];
    const messages = 'SELECT * FROM messages WHERE id=$1 AND recieverId=$2';
    const changeStatus = 'UPDATE messages SET status=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(messages, [req.params.id, req.user.id]);
      result = rows[0];
      if (!result) {
        return res.status(404).send({ 
          status : 'error',
          error : 'Massage not Found' });
      }
      if (result) {
        const values = ['read', req.params.id];
        const response = await db.query(changeStatus, values);
        return res.status(200).send({
          status: 'success',
          data: result,
        });
      }
    }
    catch (e) {
      return res.status(500).send({ message: 'request not granted' });
    }
}
    

  static async getUnreadMessages(req, res) {
    const messages = 'SELECT * FROM messages WHERE recieverId=$1 AND status=$2';
    const { rows } = await db.query(messages, [req.user.id, 'unread']);
    if (!rows[0]) {
      return res.status(400).send({ 
        status: "error",
        error : "You don't have any unread messages"
      });
    }
    return res.status(200).send([{
      status: 'success',
      data: rows,
    }]);
}

  static async retractAMessage(req, res) {
   let result = [];
   const Message = 'SELECT * FROM messages WHERE id=$1';
   const { rows } = await db.query(Message, [req.params.id]);
   result = rows[0];
   if (!result) {
    return res.status(404).send({ 
      status: "error",
      error : 'message not found' });
   }
   if (result.status === 'sent') {
    const updateMessage = `UPDATE messages SET status = ${'draft'} WHERE senderId=$1 and id=$2`;
    const { rows } = db.query(updateMessage, [req.user.id, req.params.id]);
    return res.status(200).send({ 
      status: 'success',
      message : 'Message retracted' 
    });
   }
  }
   

  static async getSentMessages(req, res) {
    const messages = 'SELECT * FROM messages WHERE senderId=$1';
    const { rows } = await db.query(messages, [req.user.id]);
    try {
      if (!rows) {
        return res.status(400).send({
          status : 'error', 
          error: 'You have not sent any messages' });
      }
      return res.status(200).send([{
        status: 'success',
        data: rows
      }]);
    } catch (e) {
      return res.status(404).send({ 
        status: 'error',
        message: 'request not Found' });
    }
  }

  static async deleteAMessage(req, res) {
     let result = [];
    const messages = 'DELETE FROM messages WHERE Id=$1 returning *';
    const updateMessage = `UPDATE messages SET is_deleted=${true} WHERE Id=$1`;

    try {
      const { rows } = await db.query(messages, [req.params.id]);
      result = rows[0];
      if (!result) {
        return res.status(404).send({ 
          status: 'error',
          error: 'Message not found' });
      } 
      if (result) {
      const { rows } = await db.query(updateMessage, [req.params.id]);
      return res.status(200).send({ 
        status : 'success',
        message: 'Message deleted' 
      });
      }
    } catch (e) {
      return res.status(400).send({ 
        status : 'error',
        error:  'email does not exist' 
      });
    }
  }
}
export default MessageController;