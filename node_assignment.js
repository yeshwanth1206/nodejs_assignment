var ageWiseLiterateDistribution = new Object();
var eduCategWise = new Object();

function File_read(fileNames) 
{
    fileNames.map(function(fileName)
		{
			var util=require('util');
			var fs = require('fs');
			readline=require('readline').createInterface({
				input:fileNames
			})
			//var data = fs.readFileSync(fileName).toString();
			console.log("For File: "+fileName);
			taken_datas_file(data);
		});
    ageWiseLiterateDistribution = dataconverter(ageWiseLiterateDistribution);
    eduCategWise = dataconverter(eduCategWise);
}
var fileNames = ["India2011.csv","IndiaSC2011.csv","IndiaST2011.csv"];
//File_read(fileNames);


function dataconverter (file_data) 
{
	var file_object=  new Array();
	for(var key in file_data) 
		{
			file_object.push(file_data[key]);
		}
	return file_object;
}


function taken_datas_file(text)
{
   var head_Line = new Array();
   text.split("\n").map(function(string_line,line_numbers)
		{
			if(string_line !=='')
				{
					var arrLine = string_line.split(",");
					if (line_numbers != 0)
						{
							arrLine[4] = arrLine[4].trim();
							var  ageKey = arrLine[5].trim();
							if (arrLine[4] == "Total" )
								{
									if (arrLine[5] != "All ages")
									{
										arrLine[12] = parseInt(arrLine[12]);
										if( ageKey in ageWiseLiterateDistribution)
											{
												ageWiseLiterateDistribution[ageKey].TotalLiteratePop += arrLine[12];
											}
										else
											{
												console.log("Keys are "+ Object.keys(ageWiseLiterateDistribution));
												console.log("key" + ageKey);
												ageWiseLiterateDistribution[ageKey] = new Object();
												ageWiseLiterateDistribution[ageKey].ageGroup = ageKey;
												ageWiseLiterateDistribution[ageKey].TotalLiteratePop = arrLine[12];
											}
									}
									else
									{
										for(var eduCatIndex=15;eduCatIndex<44;eduCatIndex+=3) 
										{
											var eduCatValue = head_Line[eduCatIndex].trim().match(/.*- (.*) -.*/)[1];
											var totalPopValue = parseInt(arrLine[eduCatIndex]);
											if (eduCatValue in eduCategWise)
												{
													eduCategWise[eduCatValue].totalPop += totalPopValue;
												}
											else
												{
												   eduCategWise[eduCatValue] = {eduCateg: eduCatValue, totalPop:totalPopValue};
												}
										}
									}
								}
						}
						else
						{
							head_Line = arrLine;
						}
				}
		});
}

function File_write()
{
    var fs = require('fs');
    fs.writeFile("ageWiseLiterateDistribution.json",JSON.stringify(ageWiseLiterateDistribution),function(err) 
	{
      if (err) throw err;
      console.log(' file is saved!');
    });
    fs.writeFile("eduCategWise.json",JSON.stringify(eduCategWise), function(err) 
	{
      if (err) throw err;
      console.log(' file is saved!');
    });
}
File_write();