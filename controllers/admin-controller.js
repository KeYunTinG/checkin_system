const bcrypt = require('bcryptjs')
const db = require('../models');
const User = db.User;
const Check = db.Check;
const adminController = {
  getAbsents: (req, res) => {
    Check.findAll({
      include: User,
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true
    })
      .then(checks => {
        if (!checks) throw new Error("Check didn't exist!")
        checks = checks.filter(Check => Check.absence == false)
        res.render('admin/absent', { checks })
      })
      .catch((err) => {
        return res.redirect('back')
      })
  },
  editAbsent: (req, res) => {
    Check.findByPk(req.params.id)
      .then(checks => {
        checks.update({
          absence: true
        })
          .then(() => {
            req.flash('successMessage', '修改成功');
            return res.redirect('/admin/absent')
          })
          .catch(() => {
            req.flash('errorMessage', '修改失敗');
            return res.redirect('/admin/absent')
          })
      })
      .catch(() => {
        req.flash('errorMessage', '修改失敗');
        return res.redirect('/admin/absent')
      })
  },
}

module.exports = adminController