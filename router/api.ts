import express from 'express'
import {readJson} from "../utils";
import {execute} from '../model/index'
import miment from 'miment'

const router = express.Router()

// 获取全国地区json
router.get('/areas', async (req, res) => {
  try {
    const areas = await readJson()
    res.json(areas)
  } catch (e) {
    console.log(e)
    res.end(e)
  }
})

// 获取省级数据
router.get('/provinceData', async (req, res) => {
  const sql = `select
    province.codeid as id, province.cityName as cityName, count(p.status)as \`total_cases\`, sum(get_cure(p.status)) as \`total_recovered\`,
    sum(get_dead(p.status)) as \`total_deaths\`
    from base_area province left join base_area city on province.codeid = city.parentid
    left join base_area ba on ba.parentid = city.codeid
    left join people p on ba.codeid = p.areacode
    where province.parentid = 0
    group by province.codeid, province.cityName;`
  execute(sql).then(rows => {
    res.end(JSON.stringify(rows))
  }).catch(err => {
    console.log(err)
  })
})

// 获取全国统计数据
router.get('/nationStatement', async (req, res) => {
  const sql = `select update_date as date, status, count(*) as count from people group by update_date,status order by date desc;`
  execute(sql).then(rows => {
    const results = []
    let obj = {}
    for (const row of rows) {
      const dateStr = miment(row.date).format('YYYY-MM-DD')
      if (!obj['date']) {
        obj['date'] = dateStr
      } else if (obj['date'] !== dateStr) {
        results.push(obj)
        obj = {}
        obj['date'] = dateStr
      }
      switch (row.status) {
        case 0:
          obj['recovered'] = row.count
          break
        case 1:
          obj['cases'] = row.count
          break
        case 2:
          obj['deaths'] = row.count
      }
    }
    results.push(obj)
    res.end(JSON.stringify(results))
  }).catch(err => {
    console.log(err)
  })
})

// 根据城市id获取市级/地区疫情统计
router.get('/cityStatement', async (req, res) => {
  if(!req.query.codeid) res.end("codeid is required")
  const codeid: string = (req.query.codeid as string)
  let sql = `select ba.codeid as id,
    ba.cityName, count(p.status)as \`total_cases\`, sum(get_cure(p.status)) as \`total_recoverd\`,
       sum(get_dead(p.status)) as \`total_deaths\`
from base_area ba left join people p on ba.codeid = p.areacode
where ba.codeid regexp ?
group by ba.codeid,ba.cityName;
`
  const params = [`^${codeid}[0-9]{4}`]
  if (['11', '12', '31', '50'].indexOf(codeid) === -1) {
    // 非直辖市
    sql = `select cba.codeid as id,
    cba.cityName, count(p.status)as \`total_cases\`, sum(get_cure(p.status)) as \`total_recoverd\`,
       sum(get_dead(p.status)) as \`total_deaths\`
from base_area cba left join base_area ba on cba.codeid = ba.parentid
left join people p on ba.codeid = p.areacode
where ba.codeid regexp ?
group by cba.codeid, cba.cityName;`
  }
  execute(sql, params).then(rows => {
    res.end(JSON.stringify(rows))
  }).catch(err => {
    console.log(err)
  })
})

// 获取人数，方便分页显示
router.get('/count', async (req, res) => {
  const codeid = req.query.codeid || ''
  const name = req.query.name || ''
  const idcard = req.query.idcard || ''
  let sql = `select count(*) as counts from people where 1=1 `
  const params = []
  switch (codeid.length) {
    case 2:
      sql += `and areacode regexp ?`
      params.push(`${codeid}[0-9]{4}`)
      break
    case 4:
      sql += `and areacode regexp ?`
      params.push(`${codeid}[0-9]{2}`)
      break
    case 6:
      sql += `and areacode regexp ?`
      params.push(`${codeid}`)
  }
  if (name) {
    sql += ` and name like ?`
    params.push(`%${name}%`)
  }
  if (idcard) {
    sql += ` and id_card like ?`
    params.push(`%${idcard}%`)
  }
  execute(sql, params).then(rows => {
    res.end(JSON.stringify(rows))
  }).catch(err => {
    console.log(err)
  })
})

// 根据codeid获取人员列表
router.get('/people', async (req, res) => {
  const codeid = req.query.codeid || ''
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 15
  const name = req.query.name || ''
  const idcard = req.query.idcard || ''
  let sql = `select * from people where 1=1 `
  const params = []
  switch (codeid.length) {
    case 2:
      sql += `and areacode regexp ?`
      params.push(`${codeid}[0-9]{4}`)
      break
    case 4:
      sql += `and areacode regexp ?`
      params.push(`${codeid}[0-9]{2}`)
      break
    case 6:
      sql += `and areacode regexp ?`
      params.push(`${codeid}`)
  }
  if (name) {
    sql += ` and name like ?`
    params.push(`%${name}%`)
  }
  if (idcard) {
    sql += ` and id_card like ?`
    params.push(`%${idcard}%`)
  }
  sql += ` limit ?`
  params.push([(parseInt(page as string) - 1) * parseInt(pageSize as string), parseInt(pageSize as string)])
  execute(sql, params).then(rows => {
    res.end(JSON.stringify(rows))
  }).catch(err => {
    console.log(err)
  })
})

// 更新人员数据
router.post('/update_people', async (req, res) => {
  if (!(req.body.data && req.body.data.person)) res.end('error')
  const person = req.body.data.person
  const sql = `update people set name = ?,id_card = ?, areacode = ?, status=?, update_date=? where id=?`
  const params = [person.name, person.id_card, parseInt(person.areacode), person.status, miment().format('YYYY-MM-DD'), person.id]
  execute(sql, params).then(result => {
    res.end(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
  })
})

// 删除人员数据
router.post('/del_people', async (req, res) => {
  if (!(req.body.data && req.body.data.id)) res.end('error')
  const id = req.body.data.id
  const sql = `delete from people where id = ?`
  const params = [id]
  execute(sql, params).then(result => {
    res.end(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
  })
})

router.post('/create_people', async (req, res) => {
  if (!(req.body.data && req.body.data.person)) res.end('error')
  const person = req.body.data.person
  const sql = `insert into people(name,id_card, areacode, status,update_date) 
  values(?,?,?,?,?)`
  const params = [person.name, person.id_card, person.areacode, person.status, miment().format('YYYY-MM-DD')]
  execute(sql, params).then(result => {
    res.end(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
  })

})

export default router
