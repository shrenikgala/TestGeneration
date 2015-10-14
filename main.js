var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var faker = require("faker");
var fs = require("fs");
faker.locale = "en";
var mock = require('mock-fs');
var _ = require('underscore');
var Random = require('random-js');

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["subject.js"];
	}
	var filePath = args[0];

	constraints(filePath);

	generateTestCases()

}

var engine = Random.engines.mt19937().autoSeed();

function createConcreteIntegerValue( greaterThan, constraintValue )
{
	if( greaterThan )
		return Random.integer(constraintValue,constraintValue+10)(engine);
	else
		return Random.integer(constraintValue-10,constraintValue)(engine);
}

function Constraint(properties)
{
	this.ident = properties.ident;
	this.expression = properties.expression;
	this.operator = properties.operator;
	this.value = properties.value;
	this.funcName = properties.funcName;
	// Supported kinds: "fileWithContent","fileExists"
	// integer, string, phoneNumber
	this.kind = properties.kind;
}
//code snippet for this function taken from stackoverflow
function cartesianProductOf(argument) {
	return _.reduce(argument, function(i, j) {
		return _.flatten(_.map(i, function(x) {
			return _.map(j, function(y) {
				return x.concat([y]);
			});
		}), true);
	}, [ [] ]);
};

function fakeDemo()
{
	console.log( faker.phone.phoneNumber() );
	console.log( faker.phone.phoneNumberFormat() );
	console.log( faker.phone.phoneFormats() );
}

var functionConstraints =
{
}

var mockFileLibrary = 
{	
	pathExists:
	{
		'path/fileExists': {}
	},
	fileWithContent:
	{
		pathContent: 
		{	
  			file1: 'text content',
  			file2: ''
		}
	}

	
};

function generateTestCases()
{

	var content = "var subject = require('./subject.js')\nvar mock = require('mock-fs');\n";
	for ( var funcName in functionConstraints )
	{
		var params = {};

		// initialize params
		for (var i =0; i < functionConstraints[funcName].params.length; i++ )
		{
			var paramName = functionConstraints[funcName].params[i];
			//params[paramName] = '\'' + faker.phone.phoneNumber()+'\'';
			params[paramName] = ['\'\''];
		}

		//console.log( params );

		// update parameter values based on known constraints.
		var constraints = functionConstraints[funcName].constraints;
		// Handle global constraints...
		
		var fileWithContent = _.some(constraints, {kind: 'fileWithContent' });
		var pathExists      = _.some(constraints, {kind: 'fileExists' });
		
	
		// plug-in values for parameters
		for( var c = 0; c < constraints.length; c++ )
		{
			var constraint = constraints[c];
			if( params.hasOwnProperty( constraint.ident ) )
			{
				params[constraint.ident].push(constraint.value);
			}
		}

		var arrayforargs = []; //queue for permuting all args

        for (var key in params )
        {
            arrayforargs.push(params[key]);
        	
        }
        	//console.log(arrayforargs);
        	//console.log("eererererererererer");
        perms = cartesianProductOf(arrayforargs);


        //console.log(perms);
		// Prepare function arguments.
		
		 for (var i=0 ; i<perms.length; i++ )
        {
            if(!pathExists || !fileWithContent)
            {
                content += "subject.{0}({1});\n".format(funcName, perms[i] );
            }
            if( pathExists || fileWithContent )
            {
                for (var j=0; j<perms[i].length; j++ )
                {
					content += "subject.{0}({1});\n".format(funcName, perms[i] );
					var temp = perms[i].join(','); 
		           
		           if(temp == "'',''"){
			             continue;
					}else{
                	
                	
                    	content += generateMockFsTestCases(pathExists,fileWithContent,funcName, perms[i]);
                     //Bonus...generate constraint variations test cases....
                    	content += generateMockFsTestCases(!pathExists,fileWithContent,funcName, perms[i]);
                    	content += generateMockFsTestCases(pathExists,!fileWithContent,funcName, perms[i]);
                    	content += generateMockFsTestCases(!pathExists,!fileWithContent,funcName, perms[i]);
                	
                	
		
                	}
				}
            }

        }
        

	}


	fs.writeFileSync('test.js', content, "utf8");

}

function generateMockFsTestCases (pathExists,fileWithContent,funcName,args) 
{
	var testCase = "";
	// Build mock file system based on constraints.
	var mergedFS = {};
	
	
	if( pathExists )
	{
		for (var attrname in mockFileLibrary.pathExists) { mergedFS[attrname] = mockFileLibrary.pathExists[attrname]; }
	}
	if( fileWithContent )
	{
		for (var attrname in mockFileLibrary.fileWithContent) { mergedFS[attrname] = mockFileLibrary.fileWithContent[attrname]; }
	}

	testCase += 
	"mock(" +
		JSON.stringify(mergedFS)
		+
	");\n";

	testCase += "\tsubject.{0}({1});\n".format(funcName, args );
	testCase+="mock.restore();\n";
	return testCase;
}

function constraints(filePath)
{
   var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);

	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var funcName = functionName(node);
			console.log("Line : {0} Function: {1}".format(node.loc.start.line, funcName ));

			var params = node.params.map(function(p) {return p.name});

			functionConstraints[funcName] = {constraints:[], params: params};

			// Check for expressions using argument.
			traverse(node, function(child)
			{
				if( child.type === 'BinaryExpression' && child.operator == "==")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])

						
						if(typeof(rightHand) === "string") {

							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: "'foo"+rightHand+"'",
										funcName: funcName,
										kind: "string",
										operator : child.operator,
										expression: expression
									}));

							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: rightHand,
										funcName: funcName,
										kind: "string",
										operator : child.operator,
										expression: expression
									}));
							
						}
						
						if(typeof(rightHand) === "integer") {
							
						
							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: parseInt(rightHand)+1,
										funcName: funcName,
										kind: "integer",
										operator : child.operator,
										expression: expression
									}));
							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: parseInt,
										funcName: funcName,
										kind: "integer",
										operator : child.operator,
										expression: expression
									}));
							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: parseInt(rightHand)-1,
										funcName: funcName,
										kind: "integer",
										operator : child.operator,
										expression: expression
									}));
						}



					}

					if (child.left.type == 'CallExpression' && child.left.callee.property.name == 'indexOf')
					{
						var substring = child.left.arguments[0].value;
						var position = child.right.value;

						

						functionConstraints[funcName].constraints.push(
						new Constraint(
						{
							ident: child.left.callee.object.name,
							value:  "'"+substring+"'",
							funcName: funcName,
							kind: "string",
							operator : child.operator,
							expression: expression
						}));

						functionConstraints[funcName].constraints.push(
						new Constraint(
						{
							ident: child.left.callee.object.name,
							value: "'foo"+substring+"'",
							funcName: funcName,
							kind: "string",
							operator : child.operator,
							expression: expression
						}));
					}

					
					
				}


				if( child.type === 'BinaryExpression' && child.operator == ">")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])

						functionConstraints[funcName].constraints.push(
							new Constraint(
								{
									ident: child.left.name,
									value: parseInt(rightHand)+1,
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));
					}
				}


				if( child.type === 'BinaryExpression' && child.operator == ">")
				{
							if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
							{
								// get expression from original source code:
								var expression = buf.substring(child.range[0], child.range[1]);
								var rightHand = buf.substring(child.right.range[0], child.right.range[1])

								functionConstraints[funcName].constraints.push(
									new Constraint(
										{
											ident: child.left.name,
											value: parseInt(rightHand)-1,
											funcName: funcName,
											kind: "integer",
											operator : child.operator,
											expression: expression
										}));
							}
				}

				if( child.type === 'BinaryExpression' && child.operator == "<")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])

						functionConstraints[funcName].constraints.push(
							new Constraint(
								{
									ident: child.left.name,
									value: parseInt(rightHand)+1,
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));
					}
				}

				if( child.type === 'BinaryExpression' && child.operator == "<")
				{
						if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
						{
							// get expression from original source code:
							var expression = buf.substring(child.range[0], child.range[1]);
							var rightHand = buf.substring(child.right.range[0], child.right.range[1])

							functionConstraints[funcName].constraints.push(
								new Constraint(
									{
										ident: child.left.name,
										value: parseInt(rightHand)-1,
										funcName: funcName,
										kind: "integer",
										operator : child.operator,
										expression: expression
									}));
						}
				}
				

				if(child.type== "LogicalExpression"){
					if(child.right.type=="UnaryExpression" && child.right.argument.property){

							var property = child.right.argument.property.name;
                            var name = child.right.argument.object.name;

                            var val1 = "{" + "\"" + property + "\": true}";
                            var val2 = "{" + "\"" + property + "\": false}";
                            var val3 = "\'\'";

                             functionConstraints[funcName].constraints.push(
                                new Constraint({
                                    ident: name,
                                    value: val1,
                                    funcName: funcName,
                                    kind: "string",
                                    operator: "operator",
                                    expression: "expression"
                                }));


                             functionConstraints[funcName].constraints.push(
                                new Constraint({
                                    ident: name,
                                    value: val2,
                                    funcName: funcName,
                                    kind: "string",
                                    operator: "operator",
                                    expression: "expression"
                                }));


                             functionConstraints[funcName].constraints.push(
                                new Constraint({
                                    ident: name,
                                    value: val3,
                                    funcName: funcName,
                                    kind: "string",
                                    operator: "operator",
                                    expression: "expression"
                                }));
					}
				}

				
				
				if( child.type == "CallExpression" &&
					child.callee.property &&
					child.callee.property.name =="readFileSync" )
					{
						for( var p =0; p < params.length; p++ )
						{
							if( child.arguments[0].name == params[p] )
							{
								functionConstraints[funcName].constraints.push(
									new Constraint(
										{
											ident: 'filePath',
											value:  "'pathContent/file1'",
											funcName: funcName,
											kind: "fileWithContent",
											operator : child.operator,
											expression: expression
										}));
								functionConstraints[funcName].constraints.push(
									new Constraint(
										{
											ident: 'filePath',
											value:  "'pathContent/file2'",
											funcName: funcName,
											kind: "fileWithContent",
											operator : child.operator,
											expression: expression
										}));
							}
						}
					}

					
					if( child.type == "CallExpression" &&
						child.callee.property &&
						child.callee.property.name =="existsSync")
						{
							for( var p =0; p < params.length; p++ )
							{
								if( child.arguments[0].name == params[p] )
								{
									functionConstraints[funcName].constraints.push(
										new Constraint(
											{
												ident: "directory",
												value:  "'path/fileExists'",
												funcName: funcName,
												kind: "fileExists",
												operator : child.operator,
												expression: expression
											}));
									functionConstraints[funcName].constraints.push(
										new Constraint(
											{
												ident: "filePath",
												value:  "'path/filenotExist'",
												funcName: funcName,
												kind: "fileWithContent",
												operator : child.operator,
												expression: expression
											}));
								}
							}
						}
						

                  


			});

			console.log( functionConstraints[funcName]);

		}
	});
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}

function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();