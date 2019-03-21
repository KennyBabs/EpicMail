import db from '../models/dbmodel';

class GroupController {
  static async createGroup(req, res) {
    let group = [];
    const checkGroup = 'SELECT * FROM groups WHERE group_email=$1';
    // const { groupEmail } = req.body;
    if (!req.body.groupname || !req.body.groupemail) {
      return res.status(400).send({ message: 'please enter groupname or groupemail' });
    }
    if (req.body.groupname || req.body.groupemail) {
      const { rows } = await db.query(checkGroup, [req.body.groupemail]);
      group = rows[0];
      if (group) {
        return res.status(400).send({ message: 'Group email already exists' });
      }
    }
    const text = 'INSERT INTO groups(group_name,group_email,created_by)VALUES($1,$2,$3)';
    const values = [
      req.body.groupname,
      req.body.groupemail,
      req.user.id,
    ];
    const { rows } = await db.query(text, values);
    return res.status(201).send({
      status: 'success',
      message: 'Group created successfully',
    });
  }

  static async deleteAGroup(req, res) {

    let groupOutput = [];
    let deleteUserGroupOutput = [];
    let deleteGroupOutput = [];
    const fetchGroup = 'SELECT * FROM groups WHERE id=$1 AND created_by=$2';
    const deleteUserGroup = 'DELETE FROM user_group WHERE group_id=$1 returning *';
    const deleteGroup = 'DELETE FROM groups WHERE id=$1 AND created_by=$2 returning *';

    try {
      const { rows } = await db.query(fetchGroup, [req.params.id, req.user.id]);
      groupOutput = rows[0];
      if (!groupOutput) {
        return res.status(404).send({ message: 'Group not Found' });
      }
    } catch (e) {
      return res.status(500).send({ message: 'request not granted' });
    }

    try {
      const { rows } = await db.query(deleteUserGroup, [req.params.id]);
      deleteUserGroupOutput = { rows };
      if (!deleteUserGroupOutput) {
        return res.status(404).send({ message: 'Access Denied' });
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

}

export default GroupController;