# 疫情数据

## 数据库设计

### 1. 地区表

全国各省市县地区的id表

### 2. 人员信息表

疫情表:

| 字段        | 说明                                |
| ----------- | ----------------------------------- |
| id          | 主键                                |
| name        | 姓名                                |
| id_card     | 身份证号                            |
| areacode    | 地区代码(外键)                      |
| status      | 状态0表示治愈，1表示确诊，2表示死亡 |
| update_date | 更新日期                            |

> 只要存在于此表中，说明该人员就是确诊过的人员，即select *为累计确诊，status=1表示现存确诊，status=0等于治愈,status=2表示死亡
>
> 累计 = 现存确诊+治愈+死亡

查询时可以使用base_area.json中的省(直辖市)来执行

| 地区表字段 | 说明                  |
| ---------- | --------------------- |
| codeid     | 省2位，市4位，区县6位 |
| cityName   | 名称                  |
| parentid   | 父级地区codeid        |

利用各级codeid即可实现分地区筛选人员数据

```sql
select * from base_area where codeid regexp '^11[0-9]{4}'; -- 查询11开头的6位地区id对应的数据(北京所有地区,包括县和市)
```

# API

## 获取地区json

#### 接口URL

> http://127.0.0.1:8089/api/areas

#### 请求方式

> GET

#### Content-Type

> application/json

#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```



## 获取省级数据

#### 接口URL

> http://127.0.0.1:8089/api/provinceData

#### 请求方式

> GET

#### Content-Type

> application/json

#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```



## 全国统计数据

#### 接口URL

> http://127.0.0.1:8089/api/nationStatement

#### 请求方式

> GET

#### Content-Type

> application/json

#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```



## 获取市级统计信息

#### 接口URL

> http://127.0.0.1:8089/api/cityStatement?codeid=11

#### 请求方式

> GET

#### Content-Type

> application/json

#### 请求Query参数

| 参数   | 示例值 | 是否必填 | 参数描述         |
| :----- | :----- | :------- | :--------------- |
| codeid | 11     | 必填     | 城市的codeid字段 |


#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```


#### 错误响应示例

```javascript
codeid is required
```


## 获取人员数量

#### 接口URL

> http://127.0.0.1:8089/api/count?codeid=11&name=张三

#### 请求方式

> GET

#### Content-Type

> application/json

#### 请求Query参数

| 参数   | 示例值 | 是否必填 | 参数描述 |
| :----- | :----- | :------- | :------- |
| codeid | 11     | 选填     | 地区id   |
| name   | 张三   | 选填     | 姓名     |


#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```



## 获取人员

#### 接口URL

> http://127.0.0.1:8089/api/people?codeid=11&page=1&pageSize=15&name=张三&idcard=110105

#### 请求方式

> GET

#### Content-Type

> application/json

#### 请求Query参数

| 参数     | 示例值 | 是否必填 | 参数描述     |
| :------- | :----- | :------- | :----------- |
| codeid   | 11     | 选填     | 所在地区id   |
| page     | 1      | 选填     | 页数         |
| pageSize | 15     | 选填     | 每页显示人数 |
| name     | 张三   | 选填     | 姓名         |
| idcard   | 110105 | 选填     | 身份证       |


#### 成功响应示例

```json
[
	{
		"id": 6,
		"name": "张三631",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 7,
		"name": "张三133",
		"id_card": "110105199412040017",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-04T16:00:00.000Z"
	},
	{
		"id": 8,
		"name": "张三74",
		"id_card": "110105199412040011",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 9,
		"name": "张三35",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 10,
		"name": "张三0",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 11,
		"name": "张三58",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 12,
		"name": "张三79",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 13,
		"name": "张三69",
		"id_card": "110105199412040012",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 14,
		"name": "张三18",
		"id_card": "110105199412040015",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 15,
		"name": "张三78",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 2,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 16,
		"name": "张三35",
		"id_card": "110105199412040018",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 17,
		"name": "张三66",
		"id_card": "110105199412040010",
		"areacode": 110105,
		"status": 0,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 18,
		"name": "张三67",
		"id_card": "110105199412040016",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 19,
		"name": "张三10",
		"id_card": "110105199412040019",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	},
	{
		"id": 20,
		"name": "张三92",
		"id_card": "110105199412040014",
		"areacode": 110105,
		"status": 1,
		"update_date": "2020-07-03T16:00:00.000Z"
	}
]
```



## 更新人员数据

#### 接口URL

> http://127.0.0.1:8089/api/update_people

#### 请求方式

> POST

#### Content-Type

> application/json






#### 请求Body参数

```json
{
	"responseType": "json",
	"crossDomain": true,
	"data": {
		"person": {
			"id": 6,
			"name": "张三613",
			"id_card": "110105199412040011",
			"areacode": "110105",
			"status": 0
		}
	}
}
```

| 参数                 | 示例值             | 是否必填 | 参数描述        |
| :------------------- | :----------------- | :------- | :-------------- |
| responseType         | json               | 必填     | axois拦截器实现 |
| crossDomain          | true               | 必填     | axois拦截器实现 |
| data                 | -                  | 必填     | axois拦截器实现 |
| data.person          | -                  | 必填     | json对象        |
| data.person.id       | 6                  | 必填     | 人员id          |
| data.person.name     | 张三613            | 必填     | 人员姓名        |
| data.person.id_card  | 110105199412040011 | 必填     | 人员身份证      |
| data.person.areacode | 110105             | 必填     | 人员居住地      |
| data.person.status   | 0                  | 必填     | 人员状态        |

#### 成功响应示例

```javascript
{
	"fieldCount": 0,
	"affectedRows": 1,
	"insertId": 0,
	"serverStatus": 2,
	"warningCount": 0,
	"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
	"protocol41": true,
	"changedRows": 1
}
```



## 删除人员

#### 接口URL

> http://127.0.0.1:8089/api/del_people

#### 请求方式

> POST

#### Content-Type

> application/json


#### 请求Body参数

```json
{
	"responseType": "json",
	"crossDomain": true,
	"data": {
		"id": 16
	}
}
```

| 参数         | 示例值 | 是否必填 | 参数描述        |
| :----------- | :----- | :------- | :-------------- |
| responseType | json   | 必填     | axois拦截器实现 |
| crossDomain  | true   | 必填     | axois拦截器实现 |
| data         | -      | 必填     | axois拦截器实现 |
| data.id      | 16     | 必填     | 人员id          |

#### 成功响应示例

```javascript
{
	"fieldCount": 0,
	"affectedRows": 1,
	"insertId": 0,
	"serverStatus": 2,
	"warningCount": 0,
	"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
	"protocol41": true,
	"changedRows": 1
}
```



## 新增人员信息

#### 接口URL

> http://127.0.0.1:8089/api/create_people

#### 请求方式

> POST

#### Content-Type

> application/json


#### 请求Body参数

```javascript
{
	"responseType": "json",
	"crossDomain": true,
	"data": {
		"person": {
			"name": "刘备",
			"id_card": "123102020201123123",
			"areacode": "140121",
			"status": "0"
		}
	}
}
```

| 参数                 | 示例值             | 是否必填 | 参数描述        |
| :------------------- | :----------------- | :------- | :-------------- |
| responseType         | json               | 必填     | axois拦截器实现 |
| crossDomain          | true               | 必填     | axois拦截器实现 |
| data                 | -                  | 必填     | axois拦截器实现 |
| data.person          | -                  | 必填     | json对象        |
| data.person.name     | 刘备               | 必填     | 人员姓名        |
| data.person.id_card  | 123102020201123123 | 必填     | 人员身份证      |
| data.person.areacode | 140121             | 必填     | 人员居住地      |
| data.person.status   | 0                  | 必填     | 人员状态        |

#### 成功响应示例

```json
{
	"fieldCount": 0,
	"affectedRows": 1,
	"insertId": 0,
	"serverStatus": 2,
	"warningCount": 0,
	"message": "(Rows matched: 1  Changed: 1  Warnings: 0",
	"protocol41": true,
	"changedRows": 1
}
```

