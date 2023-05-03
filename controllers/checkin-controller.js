const helpers = require('../helpers/auth-helpers')
const db = require('../models');
const User = db.User;
const Check = db.Check;
const calendarList = require('../calendar.json');
const checkinController = {
  homepage: (req, res) => {
    const User = helpers.getUser(req).name;
    res.render('home', { user: User });
  },
  checkin: (req, res) => {
    let now = new Date()
    let today, wMinute, wMonth, wDate
    if (now.getMonth() >= 10) {
      wMonth = `${now.getMonth() + 1}`
    } else {
      wMonth = `0${now.getMonth() + 1}`
    }

    if (now.getDate() > 10) {
      wDate = `${now.getDate()}`
      if (now.getHours() < 5) {
        wDate = `${now.getDate() - 1}`
      }
    } else if (now.getDate() === 10) {
      wDate = `${now.getDate()}`
      if (now.getHours() < 5) {
        wDate = `0${now.getDate() - 1}`
      }
    } else {
      wDate = `0${now.getDate()}`
      if (now.getHours() < 5) {
        wDate = `0${now.getDate() - 1}`
      }
    }
    if (wDate == '00') {
      wDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
      if (now.getMonth() > 10) {
        wMonth = `${now.getMonth()}`
      } else {
        wMonth = `0${now.getMonth()}`
      }
    }
    today = `${now.getFullYear()}${wMonth}${wDate}`
    if (now.getMinutes() >= 10) {
      wMinute = `${now.getMinutes()}`
    } else {
      wMinute = `0${now.getMinutes()}`
    }
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
                req.flash('successMessage', `${now.getHours()}:${wMinute},下班打卡成功!`)
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
                req.flash('errorMessage', `${now.getHours()}:${wMinute},下班打卡成功!，出勤未滿8小時`)
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
              req.flash('successMessage', `${now.getHours()}:${wMinute},上班打卡成功!`)
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