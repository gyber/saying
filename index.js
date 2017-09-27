//set NODE_ENV=production;

const path = require('path');
const express = require('express');
const formidable = require('express-formidable');

var app = express();
var config = require('config-lite')(__dirname);

var rry = require('./model/idiom').rry;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(formidable());

app.get('/', function (req, res) {
    //res.send('hello');
    res.render('index',{chosen:"请输入成语，不过不是也可以"});
});

app.post('/',function(req,res){
    //res.render('index',{chosen:(req.fields.toChoose + rry[0])});
    var toChoose = req.fields.toChoose;
    var final,i,j;
    //var w=[1,2,3];
    //w.length;
    for(i=0;i<rry.length;i++)
    {
        if(rry[i][0] == toChoose){
            //res.render('index',{chosen:rry[i]});
            break;
        }
    }

    final="";
    if(i>=rry.length){
        final="强行接龙：<br>";
        for(j=0;j<rry.length;j++){
            if(rry[j][1]!=-2 && toChoose[toChoose.length-1] ==  rry[j][0][0]){
                break;
            }
        }

        if(j>=rry.length){
            final+="无法接龙至为所欲为<br>";
        }
        else{
            final+=toChoose+"<br>";
            query_track(j);
        }
    }
    else if(rry[i][1] == -2){
        final="无法接龙至为所欲为<br>";
    }
    else{
        query_track(i);
    }

    function query_track(cur){
        if(cur == -1){
            return ;
        }
        final += rry[cur][0]+"<br>";
        query_track(rry[cur][1]);
    }

    res.render('index',{chosen: final });
})

app.listen(config.port, function () {
    console.log(`listening on port ${config.port}`)
});