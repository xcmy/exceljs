var app = require("express")();
const Excel = require("exceljs");



app.get("/excel",function (req,res) {

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

    // 设置合并单元格
    // sheet.mergeCells("A4:B5");

    var file = "./file/" + Date.now()+ '.xlsx';
    workbook.xlsx.writeFile(file).then(function (value) {
        res.download(file,"测试表.xlsx",function (err) {
            if(err){
                console.log("download error: " + err)
            }else {
                console.log("download over.");

                // #文件移除
                // fs.unlink(file,function (err) {
                //     if(err){
                //         console.log(err)
                //     }else {
                //         console.log("remove file "+'OK.');
                //     }
                // })
            }
        })
    })
});

app.listen(3000);
