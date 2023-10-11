const {ArrayStats,average,stdev,mapperVariance}=require('../main');

describe('ArrayStats',function(){

    let myArray;

    beforeEach(function(){
        myArray=new ArrayStats(7,11,5,14);
    });

    it('should create an instance of ArrayStats with initial values',function(){
        const myArray=new ArrayStats(7,11,5,14);
        expect(myArray instanceof ArrayStats).toBe(true);
    });

    it('should handle empty arrays for average',function(){
        myArray=new ArrayStats();
        const avgResult=myArray.average();
        expect(isNaN(avgResult)).toBe(true);
    });

    it('should handle empty arrays for stdev',function(){
        myArray=new ArrayStats();
        const stdevResult=myArray.stdev();
        expect(isNaN(stdevResult)).toBe(true);
    });

    it('should calculate the correct average',function(){
        const avgResult=myArray.average();
        expect(avgResult).toBe(9.25);
    });

    it('should set avgVal property correctly',function(){
        myArray.average();
        expect(myArray.avgVal).toBe(9.25);
    });

    it('should calculate the correct standard deviation',function(){
        myArray.average();
        const stdevResult=myArray.stdev();
        expect(stdevResult).toBeCloseTo(4.031128874149275);  
    });

    it('should set sdev property correctly',function(){
        myArray.average();
        myArray.stdev();
        expect(myArray.sdevVal).toBe(4.031128874149275);
    });

    it('should be able to handle average of a single element as 0',function(){
        const singleArray=new ArrayStats(5);
        const avgResult=singleArray.average();
        expect(avgResult).toBe(0);
    });

    it('should be able to handle standard deviations of a single element as 0',function(){
        const singleArray=new ArrayStats(5);
        singleArray.average();
        const stdevResult=singleArray.stdev();
        expect(stdevResult).toBe(0);
    });

    it('should handle an array with negative values for average',function(){
        const negativeArray=new ArrayStats(-3,-7,-1,-5);
        const avgResult=negativeArray.average();
        expect(avgResult).toBe(-4);
    });

    it('should handle an array with negative values for standard deviation',function(){
        const negativeArray=new ArrayStats(-3,-7,-1,-5);
        negativeArray.average();
        const stdevResult=negativeArray.stdev();
        expect(stdevResult).toBeCloseTo(2.5819888974716);
    });

    it('should be able to handle a large array in a reasonable time for average',function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL=10000;
        const largeArray = new ArrayStats(...Array(10000).fill(1));
        const startAverage=new Date().getTime();
        const avgResult=largeArray.average();
        const endAverage=new Date().getTime();
        const maxExecutionTime=5000;
        expect(endAverage-startAverage).toBeLessThan(maxExecutionTime);
        expect(avgResult).toBe(1);
    });

    it('should be able to handle a large array in a reasonable time for standard deviation',function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL=10000;
        const largeArray = new ArrayStats(...Array(10000).fill(1));
        largeArray.average();
        const startStdev=new Date().getTime();
        const stdevResult=largeArray.stdev();
        const endStdev=new Date().getTime();
        const maxExecutionTime=5000;
        expect(endStdev-startStdev).toBeLessThan(maxExecutionTime);
        expect(stdevResult).toBe(0);
    });
    
    it('should calculate the squared difference from the average',function(){
        myArray.average();
        const varianceResult=myArray.mapperVariance(11);
        expect(varianceResult).toBe(3.0625);
    });

    it('should work correctly for multiple instances',function(){
        const a1=new ArrayStats(7,11,5,14);
        const a2=new ArrayStats(3,8,2,9);

        const avg1=a1.average();
        const avg2=a2.average();

        expect(avg1).toBe(9.25);
        expect(avg2).toBe(5.5);
        expect(a1.avgVal).toBe(9.25);
        expect(a2.avgVal).toBe(5.5);
    });

    it('should handle arrays with very large values (edge cases)',function(){
        const largeArray = new ArrayStats(1e20, 2e20, 3e20, 4e20);
        const smallArray = new ArrayStats(1e-20, 2e-20, 3e-20, 4e-20); 

        const avgResultLarge = largeArray.average();
        const stdevResultLarge = largeArray.stdev();
        const avgResultSmall = smallArray.average();
        const stdevResultSmall = smallArray.stdev();

        expect(avgResultLarge).toBe(2.5e20);
        expect(stdevResultLarge).toBeCloseTo(1.2909944487358056e20);
        expect(avgResultSmall).toBe(2.5e-20);
        expect(stdevResultSmall).toBeCloseTo(1.2909944487358056e-20);
    });

    it('should handle non-numeric values gracefully', function() {
        const mixedArray = new ArrayStats('string', 7, { key: 'value' }, [1, 2, 3]);
    
        const avgResult = mixedArray.average();
        const stdevResult = mixedArray.stdev();
    
        expect(isNaN(avgResult)).toBe(true);
        expect(isNaN(stdevResult)).toBe(true);
    });
    
});