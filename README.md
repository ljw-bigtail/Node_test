# 说明

## FB-DPA

功能：为facebook自动广告提供数据，定期发送在邮箱

Tips：由于业务原因，本来FB支持定时任务爬取数据（导表），最终只能发表给业务人员。另，FB支持pixel自动添加商品数据（缺点，下架/商品更新不及时）

运行方式： 在promise中修改数据库信息、右键信息后,在 cmd 中 node ./auto.js