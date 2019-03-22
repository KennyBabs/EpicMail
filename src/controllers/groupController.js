import db from '../models/dbmodel';

class GroupController {
  static async createGroup(req, res) {
    let group = [];
    
    const checkGroup = 'SELECT * FROM groups WHERE groupname=$1';
    if (!req.body.groupname) {
      return res.status(400).send({ 
        status : 'error',
        message: 'please enter a groupname'
       });
    }
    // =====check if groupname already exist===========
    if (req.body.groupname) {
      const { rows } = await db.query(checkGroup, [req.body.groupname]);
      group = rows[0];
      if (group) {
        return res.status(400).send({
          status: 'error',
          error: 'Group email already exists' 
        });
      }
    }
    const text = 'INSERT INTO groups(group_name, created_by)VALUES($1,$2)';
    const values = [
      req.body.groupname,
      req.user.id
    ];
    const { rows } = await db.query(text, values);
    return res.status(201).send({
      status: 'success',
      message: 'Group created successfully',
    });
  }

  static async deleteAGroup(req, res) {

    let result = [];
    let deleteUserGroupOutput = [];
    let deleteGroupOutput = [];
    const fetchGroup = 'SELECT * FROM groups WHERE id=$1 AND created_by=$2';
    const deleteUserGroup = 'DELETE FROM user_group WHERE group_id=$1 returning *';
    const deleteGroup = 'DELETE FROM groups WHERE id=$1 AND created_by=$2 returning *';

    try {
      const { rows } = await db.query(fetchGroup, [req.params.id, req.user.id]);
      result = rows[0];
      if (!result) {
        return res.status(404).send({ 
          status: 'error',
          error : 'Group not Found' 
        });
      }
    } catch (e) {
      return res.status(500).send({
        status : 'error',
        error: 'Server error' 
      });
    }

    try {
      const { rows } = await db.query(deleteUserGroup, [req.params.id]);
      deleteUserGroupOutput = { rows };
      if (!deleteUserGroupOutput) {
        return res.status(404).send({ 
          status: 'error',
          error: 'Access Denied' 
        });
      }
    } catch (e) {
      return res.status(400).send({ message: 'request not found' });
    }

    try {
      const { rows } = await db.query(deleteGroup, [req.params.id, req.user.id]);
      deleteGroupOutput = rows[0];
      if (!deleteGroupOutput) {
        return res.status(404).send({ message: 'Access Denied' });
      }
      return res.status(200).send({ message: 'group deleted' });
    } catch (e) {
      return res.status(500).send({ message: 'request not granted' });
    }
  }

  static async deleteUserInAGroup(req, res) {

    let user = []; 
    let deleteUserOutput = [];
    const userQuery = `SELECT * FROM user_group k 
                             INNER JOIN groups p ON k.group_id = p.id
                             WHERE p.created_by=$1 AND k.group_id=$2 AND k.user_ids=$3`;
    const deleteUser = 'DELETE FROM user_group WHERE group_id=$1 AND user_ids=$2';
    const { rows } = await db.query(userQuery, [req.user.id, req.params.group, req.params.user]);
    user = rows[0];
    if (!user) {
      res.status(404).send({ 
        status : 'error',
        error: 'User not found' });
    }
    try {
      const { rows } = await db.query(deleteUser, [user.group_id, user.user_ids]);
      deleteUserOutput = rows[0];
      return res.status(200).send({ 
        status :  'success',
        message: 'User deleted successfully' 
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static async getAllGroups(req, res) {
    const group = 'SELECT * FROM groups where created_by=$1';
    let result = [];
    try {
      const { rows } = await db.query(group, [req.user.id]);
      result = rows;
      if (!result) {
        res.status(404).send({
          status: 'error',
          message: 'groups not found' 
        });
      }
      res.status(200).send({
        status: 200,
        data: result,
      });
    }
    catch (e) {
      return res.status(500).send({
        status : 'error',
        error : 'Server error'
      });
    }
  }

  static async addUserToGroup(req, res) {
    let group = [];
    const checkGroup = 'SELECT * FROM groups WHERE id=$1 AND created_by=$2';
    if (!req.body.userEmails) {
      return res.status(400).send({ 
        status : 'error',
        error: 'User emails are required' 
      });
    }
    if (req.body.userEmails) {
      const { rows } = await db.query(checkGroup, [req.params.id, req.user.id]);
      group = rows[0];
      if (!group) {
        return res.status(404).send({ 
          status : 'error',
          message: 'Group not found'
         });
      }
    }
    const { rows } = await db.query(checkGroup, [req.params.id, req.user.id]);
    const kk = req.body.userEmails;
    const text = `INSERT INTO user_group (group_id, user_ids) VALUES (${group.id}, unnest(array[${kk}]))`;
    try {
      const { rows } = await db.query(text);
      return res.status(201).send(
        rows[0]
        );
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: 'Server error'
      });
    }
  }

  static async updateGroupName (req, res) {
    let result;
    const selectOneGroup = `SELECT * FROM groups WHERE id=$1`; 
    const updateGroup = `UPDATE groups SET groupname=$1 WHERE id=$2` 
    try {
      const { rows } = await db.query(selectOneGroup, [req.params.id]);
      result = rows[0];
      if (!result) {
        return res.status(404).send({ 
          status: 'error',
          error: 'Group not found' 
        });
      } 
      if (result) {
      const { rows } = await db.query(updateGroup, [req.body.groupname, req.params.id]);
      return res.status(200).send({ 
        status : 'success',
        message: rows[0] 
      });
      }
    } catch (e) {
      return res.status(400).send({ 
        status : 'error',
        error:  'Email does not exist' 
      });
    }
  }
    

  static async sendMessageToGroup(req, res) {

    let groupInfo = [];
    const selectOneGroup = `SELECT * FROM groups  
                                  WHERE id=$1`;
    if (!req.body.subject) {
      return res.status(400).send({
        status: 'error',
        error: 'A subject is required'
       });
    }
    if (!req.body.groupname) {
      return res.status(400).send({
        status: 'error',
        error: 'Group name required'
      })
    }
    if (!req.body.message) {
      return res.status(400).send({ 
        status: 'error',
        error: 'A message is required' 
      });
    }
    if (req.body.subject || req.body.message) {
      try {
        const { rows } = await db.query(selectOneGroup, [req.params.id]);
        groupInfo = rows[0];
        if (!groupInfo) {
          return res.status(404).send({
            status: 'error',
            error: 'Group not Found' 
          });
        }
        const text = `
            INSERT INTO messages(email,subject,message,status,senderId,recieverId,group_reciever,group_status)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            returning *`;
        const values = [
          req.body.groupname,
          req.body.subject,
          req.body.message,
          'unread',
          req.user.id,
          null,
          groupInfo.id,
          'true',
        ];
        const { rows: info } = await db.query(text, values);
        return res.status(201).send({
          status: success,
          data: info,
        });
      } catch (error) {
        return res.status(500).send({
          status: 'error',
          error: 'Server'
        
        });
      }
    }
  }

}

export default GroupController;