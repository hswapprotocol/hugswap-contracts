var fs = require('fs')

export function save_to_json(key :string ,value:object){
    var path = "deploy_result.json"
    let obj = {};

    if (fs.existsSync(path)) {
        obj = JSON.parse( fs.readFileSync(path, 'utf-8'));
        obj[key]=value;
        let json = JSON.stringify(obj);
        fs.writeFileSync(path, json);
    }else {
        obj[key]=value;
        let json = JSON.stringify(obj);
        fs.writeFileSync(path, json);
    }
}
