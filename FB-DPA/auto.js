
var xlsx = require('node-xlsx');
var schedule = require("node-schedule");
var mysql = require('./promise');
var fs = require('fs');

var sql_8 = "SELECT 'ID' , '标题' , '描述', '原价' , '图片' , '分组' , '售价', '模块ID集合' FROM DUAL UNION ALL SELECT  	p_product.id , p_product.title, p_product.description, p_product.original_price,   (SELECT f_file_storage.url FROM f_file_storage WHERE f_file_storage.id = (SELECT p_product_image.file_storage_id FROM p_product_image WHERE p_product_image.type = 0 AND p_product_image.product_id = p_product.id)) product_images,  (SELECT erp_admin_category.`name` FROM erp_admin_category WHERE erp_admin_category.id IN (SELECT erp_admin_category_product.category_id FROM erp_admin_category_product WHERE erp_admin_category_product.product_id = p_product.id) LIMIT 1),  p_product.min_price,  (		SELECT 			GROUP_CONCAT( DISTINCT a_aggregate_module_product.aggregate_module_id Separator ' ') 		FROM a_aggregate_module_product 		WHERE a_aggregate_module_product.product_id = p_product.id AND a_aggregate_module_product.yn = 1	AND a_aggregate_module_product.aggregate_module_id IN (SELECT a_aggregate_page_module.aggregate_module_id FROM a_aggregate_page_module WHERE a_aggregate_page_module.yn = 1 AND a_aggregate_page_module.aggregate_page_id IN (SELECT a_aggregate_page.id FROM a_aggregate_page WHERE a_aggregate_page.yn = 1 AND a_aggregate_page.scope_id = 8))	) moduleIds FROM p_product WHERE p_product.yn = 1 AND p_product.`status` = 10  AND p_product.id IN (	SELECT a_aggregate_module_product.product_id FROM a_aggregate_module_product WHERE a_aggregate_module_product.yn = 1 AND a_aggregate_module_product.aggregate_module_id IN   ( 		SELECT a_aggregate_page_module.aggregate_module_id FROM a_aggregate_page_module WHERE a_aggregate_page_module.yn = 1 AND a_aggregate_page_module.aggregate_page_id IN     (        SELECT a_aggregate_page.id FROM a_aggregate_page WHERE a_aggregate_page.yn = 1 AND a_aggregate_page.scope_id = 8     )   ) );"
var sql_3 = "SELECT 'ID' , '标题' , '描述', '原价' , '图片' , '分组' , '售价', '模块ID集合' FROM DUAL UNION ALL SELECT  	p_product.id , p_product.title, p_product.description, p_product.original_price,   (SELECT f_file_storage.url FROM f_file_storage WHERE f_file_storage.id = (SELECT p_product_image.file_storage_id FROM p_product_image WHERE p_product_image.type = 0 AND p_product_image.product_id = p_product.id)) product_images,  (SELECT erp_admin_category.`name` FROM erp_admin_category WHERE erp_admin_category.id IN (SELECT erp_admin_category_product.category_id FROM erp_admin_category_product WHERE erp_admin_category_product.product_id = p_product.id) LIMIT 1),  p_product.min_price,  (		SELECT 			GROUP_CONCAT( DISTINCT a_aggregate_module_product.aggregate_module_id Separator ' ') 		FROM a_aggregate_module_product 		WHERE a_aggregate_module_product.product_id = p_product.id AND a_aggregate_module_product.yn = 1	AND a_aggregate_module_product.aggregate_module_id IN (SELECT a_aggregate_page_module.aggregate_module_id FROM a_aggregate_page_module WHERE a_aggregate_page_module.yn = 1 AND a_aggregate_page_module.aggregate_page_id IN (SELECT a_aggregate_page.id FROM a_aggregate_page WHERE a_aggregate_page.yn = 1 AND a_aggregate_page.scope_id = 3))	) moduleIds FROM p_product WHERE p_product.yn = 1 AND p_product.`status` = 10  AND p_product.id IN (	SELECT a_aggregate_module_product.product_id FROM a_aggregate_module_product WHERE a_aggregate_module_product.yn = 1 AND a_aggregate_module_product.aggregate_module_id IN   ( 		SELECT a_aggregate_page_module.aggregate_module_id FROM a_aggregate_page_module WHERE a_aggregate_page_module.yn = 1 AND a_aggregate_page_module.aggregate_page_id IN     (        SELECT a_aggregate_page.id FROM a_aggregate_page WHERE a_aggregate_page.yn = 1 AND a_aggregate_page.scope_id = 3     )   ) );"

var auto_8 = function(){
	mysql
	//查询数据,并转化成生成xlsx所需的格式
		.query(sql_8)
		.then(function(rows){
			var datas = [];
			rows.forEach(function(row){
			var newRow = [];
				for(var key in row){
					newRow.push(row[key]);
				}
				datas.push(newRow);
			})
			return Promise.resolve(datas);
		})
		//生成xlsx文件
		.then(function(datas){
			var buffer = xlsx.build([{name: "dpa", data: datas}]);
			var xlsxname = `91up_${mysql.nowDate().split(' ')[0]}.csv`;
			return new Promise(function(resolve, reject){
				fs.writeFile(xlsxname, buffer, 'binary',function(err){
					if (err) {
						throw new error('创建excel异常');
						return;
					}
					resolve(xlsxname)
				})
			})
		})
		//发送邮件,返回信息
		.then(function(xlsxname){
			return mysql.sendMail(xlsxname);
		})
		.then(function(info){
			console.log(info, mysql.nowDate());
		})
		//捕捉未处理的异常
		.catch(function(e){
			console.log(e);
		});
	
}

var auto_3 = function(){
	mysql
	//查询数据,并转化成生成xlsx所需的格式
		.query(sql_3)
		.then(function(rows){
			var datas = [];
			rows.forEach(function(row){
			var newRow = [];
				for(var key in row){
					newRow.push(row[key]);
				}
				datas.push(newRow);
			})
			return Promise.resolve(datas);
		})
		//生成xlsx文件
		.then(function(datas){
			var buffer = xlsx.build([{name: "dpa", data: datas}]);
			var xlsxname = `young_${mysql.nowDate().split(' ')[0]}.csv`;
			return new Promise(function(resolve, reject){
				fs.writeFile(xlsxname, buffer, 'binary',function(err){
					if (err) {
						throw new error('创建excel异常');
						return;
					}
					resolve(xlsxname)
				})
			})
		})
		//发送邮件,返回信息
		.then(function(xlsxname){
			return mysql.sendMail(xlsxname);
		})
		.then(function(info){
			console.log(info, mysql.nowDate());
		})
		//捕捉未处理的异常
		.catch(function(e){
			console.log(e);
		});
}
 

 // auto_8();
  auto_3();
  
var rule      = new schedule.RecurrenceRule();
var t = [];
for (var i = 0; i < 60; i++) {
	t.push(i);
}
var times     = t;
rule.second   = times;

schedule.scheduleJob('0 30 11 * * ?', function(){
  auto_8();
  auto_3();
});