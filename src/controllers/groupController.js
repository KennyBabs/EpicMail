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
}

export default GroupController;