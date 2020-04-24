
class Utils {
    removeAccents(s) {
        let r = s.toLowerCase();
        r = r.replace(new RegExp(/[àáâãäå]/g), "a");
        r = r.replace(new RegExp(/[èéêë]/g), "e");
        r = r.replace(new RegExp(/[ìíîï]/g), "i");
        r = r.replace(new RegExp(/[òóôõö]/g), "o");
        r = r.replace(new RegExp(/[ùúûü]/g), "u");
        return r;
    }

    getMonthNumberByName(name){
        name = this.removeAccents(name);
        let months = ["enero","febrero","marzo","abril","mayo","junio","julio",
                    "agosto","setiembre","octubre","noviembre","diciembre"];
        let number = "0";
        months.forEach((element,key) => {
            if (name === element){
                number += (key + 1).toString();
                return false; 
            }
        });
        return number.slice(-2);
    }

    clearExcessiveSpaces(txt){
        return txt.replace(/\s\s+/g, ' ');
    }

    clearArticlesString(arrTxt){
        let articles = ["el","la","las","lo","los","en","un","y","o","se","es","de"];
        return this.arrayDiff(arrTxt,articles).join(" ");
    }

    arrayDiff(mainArray,arrayDiff){
        return mainArray.filter(item =>{
            return arrayDiff.indexOf(item) == -1;
        });
    }
}

export default Utils;