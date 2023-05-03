const helpers = require('../helpers/auth-helpers')
const db = require('../models');
const User = db.User;
const Check = db.Check;
const calendarList = require('../calendar.json');
const moment = require('moment');
const checkinController = {
  homepage: (req, res) => {
    const User = helpers.getUser(req).name;
    res.render('home', { user: User });
  },
  checkin: (req, res) => {
    let today, wYear, wMonth, wDate, wHour, nowHour, nowMinute
    wYear = moment().utcOffset("+03:00").format().slice(0, 4)
    wMonth = moment().utcOffset("+03:00").format().slice(5, 7)
    wDate = moment().utcOffset("+03:00").format().slice(8, 10)
    wHour = moment().utcOffset("+03:00").format().slice(11, 13)

    nowHour = moment().utcOffset("+08:00").format().slice(11, 13)
    nowMinute = moment().utcOffset("+08:00").format().slice(14, 16)
    let now = new Date()
    today = `${wYear}${wMonth}${wDate}`
    const checkDay = calendarList.calendar.filter(calendarList => calendarList.西元日期 === today && calendarList.是否放假 == 0)
    if (checkDay.length == 1) {
      Check.findOne({ where: { workingDay: today, UserId: helpers.getUser(req).id } }).then(checks => {
        if (checks) {
          const hour = Math.floor((now - checks.onLine) / (1000 * 60 * 60))
          console.log(hour)
          if (hour >= 8) {
            checks.update({
              offLine: now,
              absence: true
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
              offLine: now
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