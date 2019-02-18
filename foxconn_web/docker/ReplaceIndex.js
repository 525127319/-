let fs = require('fs');
class ReplaceIndex{
    replacePath(){
        let content = fs.readFileSync('../build/index.html');
        content = content.toString();
	var reg = new RegExp('../../static', 'g')
        content = content.replace(reg, './static');	
        fs.writeFileSync('../build/index.html', content);
    }
}

let instance = new ReplaceIndex();
instance.replacePath();
//export default instance;