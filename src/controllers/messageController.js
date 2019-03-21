import db from '../models/dbmodel';

class MessageController {
  static async createMessage(req, res) {
    const { email } = req.body;
    
    let userInfo = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    
//======check if email exist=======================

    if (req.body.email) {
      try {
        const { rows } = await db.query(findOneEmail, [email]);
        userInfo = rows[0];
        if (!userInfo) {
          return res.status(400).send({ message: 'the email does not exist' });
        }
        const text = `
            INSERT INTO messages(email, subject, message, status, senderId, recieverId, parentMessageId, group_reciever,is_deleted,group_status)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
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
          'false',
        ];
          const { rows: output } = await db.query(text, values);
          return res.status(201).send({
            status: 'success',
            data : output[0]
          });
        } catch (error) {
          return res.status(400).send(error);
        }
      }
    }

  static async getAllMessages(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE recieverId=$1 AND is_deleted=$2';
    try {
      const { rows } = await db.query(messages, [req.user.id, 'false']);
      output = rows;
      if (!output) {
        return res.status(400).send({ message: 'messages not Found' });
      }
      return res.status(200).send({
        status: 'success',
        data: rows,
      });
    }
    catch (e) {
      return res.status(500).send({ message: 'request not granted' });
    }
}

  static async getAMessage(req, res) {
    let output = [];
    const messages = 'SELECT * FROM messages WHERE id=$1 AND recieverId=$2 AND is_deleted=$3';
    const changeStatus = 'UPDATE messages SET status=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(messages, [req.params.id, req.user.id, 'false']);
      output = rows[0];
      if (!output) {
        return res.status(400).send({ message: 'email not Found' });
      }
      if (output) {
        const values = ['read', req.params.id];
        const response = await db.query(changeStatus, values);
        return res.status(200).send({
          status: 'success',
          data: output,
        });
      }
    }
    catch (e) {
      return res.status(500).send({ message: 'request not granted' });
    }
}
    

  static async getUnreadMessages(req, res) {
    const messages = 'SELECT * FROM messages WHERE recieverId=$1 AND status=$2 AND is_deleted=$3';
    const { rows } = await db.query(messages, [req.user.id, 'unread', 'false']);
    if (!rows[0]) {
      return res.status(400).send({ message: 'unread messages not Found' });
    }
    return res.status(200).send([{
      status: 'success',
      data: rows,
    }]);
}

  static async retractAMessage(req, res) {
   let output = [];
   const Message = 'SELECT * FROM messages WHERE id=$1';
   const { rows } = await db.query(Message, [req.params.id]);
   output = rows[0];
   if (!output) {
    return res.status(404).send({ message: 'message doesnt exist' });
   }
   if (output.status === 'read') {
    const updateMessage = `UPDATE messages SET is_deleted = ${'true'} WHERE sender=$1 and id=$2`;
    const { rows } = db.query(updateMessage, [req.user.id, req.params.id]);
    return res.status(200).send({ message: 'message retracted' });
   }
   if (output.status === 'unread') {
    const deleteMessage = 'DELETE FROM messages WHERE sender=$1 AND id=$2';
    const { rows } = db.query(deleteMessage, [req.user.id, req.params.id]);
    return res.status(200).send({ message: 'message retracted' });
    }
  }

  static async getMessagesSent(req, res) {
    const messages = 'SELECT * FROM messages WHERE senderId=$1';
    const { rows } = await db.query(messages, [req.user.id]);
    try {
      if (rows.length <= 0) {
        return res.status(400).send({ message: 'you have not sent any messages' });
      }
      return res.status(200).send([{
        status: 'success',
        data: rows
      }]);
    } catch (e) {
      return res.status(400).send({ message: 'request not Found' });
    }
  }

  static async deleteAMessage(req, res) {
    // let output = [];
    const messages = 'UPDATE messages SET is_deleted=$1 WHERE reciever=$2 AND id=$3 returning *';

    try {
      const { rows } = await db.query(messages, ['true', req.user.id, req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'you cannot delete this message' });
      }
      return res.status(200).send({ message: 'the message has been deleted' });
      // if(!output) {
      //   return res.status(400).send({'message': 'email does not exist'});
      // }
    } catch (e) {
      return res.status(400).send({ message: 'email does not exist' });
    }
  }
}
export default MessageController;