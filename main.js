class ArrayStats extends Array{
    average(){
        const averageValue=this.reduce((a,b)=>a+b,0)/this.length;
        Object.defineProperty(this,"avgVal",{
            value:averageValue,
            writable:false,
        });
        return averageValue;
    }

    mapperVariance(currentValue){
        const averageValue=this.avgVal;
        return (currentValue-averageValue)**2;
    }

    stdev(){
        const varianceArray=this.map(this.mapperVariance,this);
        const varianceVal=varianceArray.reduce((a,b)=>a+b,0);
        const stdevValue=Math.sqrt(varianceVal/(this.length-1));
        Object.defineProperty(this,"sdevVal",{
            value:stdevValue,
            writable:false,
        });
        return stdevValue;
    }
}

let myArray=new ArrayStats(7,11,5,14);
const avgResult = myArray.average();
const stdevResult = myArray.stdev();
console.log("Average:",avgResult);
console.log("Standard Deviation:",stdevResult);