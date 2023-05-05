const helpers = require('../helpers/auth-helpers')
const db = require('../models');
const User = db.User;
const Check = db.Check;
const calendarList = require('../calendar.json');
const moment = require('moment');
const checkinController = {
  homepage: (req, res) => {
    const Username = helpers.getUser(req).name;
    Check.findAll({
      include: User,
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true
    })
      .then(checks => {
        if (!checks) throw new Error("Checks didn't exist!")
        res.render('home', { username: Username, checks })
      })
      .catch((err) => {
        return res.redirect('back')
      })
  },
  checkin: (req, res) => {
    let today, wYear, wMonth, wDate, nowHour, nowMinute
    //因應5點換日
    wYear = moment().utcOffset("+03:00").format().slice(0, 4)
    wMonth = moment().utcOffset("+03:00").format().slice(5, 7)
    wDate = moment().utcOffset("+03:00").format().slice(8, 10)
    //真實時間
    nowHour = moment().utcOffset("+08:00").format().slice(11, 13)
    nowMinute = moment().utcOffset("+08:00").format().slice(14, 16)
    let now = `${moment().utcOffset("+08:00").format().slice(0, 10)}    ${moment().utcOffset("+08:00").format().slice(11, 19)}`
    today = `${wYear}${wMonth}${wDate}`
    const checkDay = calendarList.calendar.filter(calendarList => calendarList.西元日期 === today && calendarList.是否放假 == 0)
    if (checkDay.length == 1) {
      Check.findOne({ where: { workingDay: today, UserId: helpers.getUser(req).id } }).then(checks => {
        if (checks) {
          const hour = Math.floor((checks.updatedAt - checks.createdAt) / (1000 * 60 * 60))
          if (hour >= 8) {
            checks.update({
              offLine: now,
              workTime: hour,
              absence: true,
              status: '完成出勤',
            })
              .then(() => {
                req.flash('successMessage', `${nowHour}:${nowMinute},下班打卡成功!`)
                return res.redirect('/home');
              })
              .catch(() => {
                req.flash('errorMessage', '下班打卡失敗!')
                return res.redirect('/home');
              })
          } else {
            checks.update({
              offLine: now,
              workTime: hour,
              status: '缺勤，工時未滿8小時',
            })
              .then(() => {
                req.flash('errorMessage', `${nowHour}:${nowMinute},下班打卡成功!，出勤未滿8小時`)
                return res.redirect('/home');
              })
              .catch(() => {
                req.flash('errorMessage', '下班打卡失敗!')
                return res.redirect('/home');
              })
          }
        } else {
          Check.create({
            workingDay: today,
            onLine: now,
            status: '缺勤，工時未滿8小時',
            UserId: helpers.getUser(req).id,
          })
            .then(() => {
              req.flash('successMessage', `${nowHour}:${nowMinute},上班打卡成功!`)
              return res.redirect('/home');
            })
            .catch(() => {
              req.flash('errorMessage', '上班打卡失敗!')
              return res.redirect('/home');
            })
        }
      })
    }
    else {
      req.flash('errorMessage', '今天為休假日')
      return res.redirect('/home');
    }
  },
}

module.exports = checkinController