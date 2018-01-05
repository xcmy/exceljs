## exceljs导出简单excel表

`workbook` 对象，指的是整份 Excel 文档。
`worksheet` 对象，指的是 Excel 文档中的表。
`cell` 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。


步骤

- 创建一个Excel 文档（`workbook`）
- 创建一个表（`worksheet`）
- 设置表的列的头的显示
- 添加行
- 生成文件

核心代码如下：
```js
    var workbook = new Excel.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();
    var sheet = workbook.addWorksheet("测试导出表");
    sheet.properties.defaultRowHeight = 25;

    sheet.columns = [
        { header: "编号", key: "id", width: 25 },
        { header: "姓名", key: "name", width: 30 },
        { header: "年龄", key: "age", width: 30 },
        { header: "性别", key: "gender", width: 30 }
    ];
    sheet.addRow({id:1,name:"小明",age:26,gender:"男"});
    sheet.addRow({id:2,name:"小红",age:27,gender:"女"});
    sheet.addRow({id:3,name:"小话",age:25,gender:"男"});

    var file = "./file/" + Date.now()+ '.xlsx';
    workbook.xlsx.writeFile(file).then(function (value) {
        res.download(file,"测试表.xlsx",function (err) {
            if(err){
                console.log("download error: " + err)
            }else {
                console.log("download over.");
            }
        })
    })
```