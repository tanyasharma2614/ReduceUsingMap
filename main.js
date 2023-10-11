class ArrayStats extends Array{

    //implementing reduce using map for use in the code 
    customReduce(reducer, initialValue){
        let accumulator=initialValue;
        this.map((currentValue,currentIndex)=>{
            accumulator=reducer(accumulator,currentValue,currentIndex,this);
        });
        return accumulator;
    }
    
    //function to calculate average
    average(){
        console.log(this.length);
        //handle case when array is empty
        if(this.length===0)
        {
            return NaN;
        }
        const averageValue=this.customReduce((a,b)=>a+b,0)/this.length;
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
        //handle empty array, we are assuming that even with 1 element, stdev value is valid
        if(this.length<1){
            return NaN;
        }
        const varianceArray=this.map(this.mapperVariance,this);
        const varianceVal=varianceArray.customReduce((a,b)=>a+b,0);
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

module.exports={
    ArrayStats
};
