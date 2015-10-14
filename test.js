var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc('','');
subject.inc('','fooundefined');
subject.inc('',undefined);
subject.inc(1,'');
subject.inc(1,'fooundefined');
subject.inc(1,undefined);
subject.inc(-1,'');
subject.inc(-1,'fooundefined');
subject.inc(-1,undefined);
subject.weird('','','','');
subject.weird('','','','foo"strict"');
subject.weird('','','',"strict");
subject.weird('','','','werw');
subject.weird('','','','foowerw');
subject.weird('','',43,'');
subject.weird('','',43,'foo"strict"');
subject.weird('','',43,"strict");
subject.weird('','',43,'werw');
subject.weird('','',43,'foowerw');
subject.weird('','',41,'');
subject.weird('','',41,'foo"strict"');
subject.weird('','',41,"strict");
subject.weird('','',41,'werw');
subject.weird('','',41,'foowerw');
subject.weird('',1,'','');
subject.weird('',1,'','foo"strict"');
subject.weird('',1,'',"strict");
subject.weird('',1,'','werw');
subject.weird('',1,'','foowerw');
subject.weird('',1,43,'');
subject.weird('',1,43,'foo"strict"');
subject.weird('',1,43,"strict");
subject.weird('',1,43,'werw');
subject.weird('',1,43,'foowerw');
subject.weird('',1,41,'');
subject.weird('',1,41,'foo"strict"');
subject.weird('',1,41,"strict");
subject.weird('',1,41,'werw');
subject.weird('',1,41,'foowerw');
subject.weird('',-1,'','');
subject.weird('',-1,'','foo"strict"');
subject.weird('',-1,'',"strict");
subject.weird('',-1,'','werw');
subject.weird('',-1,'','foowerw');
subject.weird('',-1,43,'');
subject.weird('',-1,43,'foo"strict"');
subject.weird('',-1,43,"strict");
subject.weird('',-1,43,'werw');
subject.weird('',-1,43,'foowerw');
subject.weird('',-1,41,'');
subject.weird('',-1,41,'foo"strict"');
subject.weird('',-1,41,"strict");
subject.weird('',-1,41,'werw');
subject.weird('',-1,41,'foowerw');
subject.weird(8,'','','');
subject.weird(8,'','','foo"strict"');
subject.weird(8,'','',"strict");
subject.weird(8,'','','werw');
subject.weird(8,'','','foowerw');
subject.weird(8,'',43,'');
subject.weird(8,'',43,'foo"strict"');
subject.weird(8,'',43,"strict");
subject.weird(8,'',43,'werw');
subject.weird(8,'',43,'foowerw');
subject.weird(8,'',41,'');
subject.weird(8,'',41,'foo"strict"');
subject.weird(8,'',41,"strict");
subject.weird(8,'',41,'werw');
subject.weird(8,'',41,'foowerw');
subject.weird(8,1,'','');
subject.weird(8,1,'','foo"strict"');
subject.weird(8,1,'',"strict");
subject.weird(8,1,'','werw');
subject.weird(8,1,'','foowerw');
subject.weird(8,1,43,'');
subject.weird(8,1,43,'foo"strict"');
subject.weird(8,1,43,"strict");
subject.weird(8,1,43,'werw');
subject.weird(8,1,43,'foowerw');
subject.weird(8,1,41,'');
subject.weird(8,1,41,'foo"strict"');
subject.weird(8,1,41,"strict");
subject.weird(8,1,41,'werw');
subject.weird(8,1,41,'foowerw');
subject.weird(8,-1,'','');
subject.weird(8,-1,'','foo"strict"');
subject.weird(8,-1,'',"strict");
subject.weird(8,-1,'','werw');
subject.weird(8,-1,'','foowerw');
subject.weird(8,-1,43,'');
subject.weird(8,-1,43,'foo"strict"');
subject.weird(8,-1,43,"strict");
subject.weird(8,-1,43,'werw');
subject.weird(8,-1,43,'foowerw');
subject.weird(8,-1,41,'');
subject.weird(8,-1,41,'foo"strict"');
subject.weird(8,-1,41,"strict");
subject.weird(8,-1,41,'werw');
subject.weird(8,-1,41,'foowerw');
subject.weird(6,'','','');
subject.weird(6,'','','foo"strict"');
subject.weird(6,'','',"strict");
subject.weird(6,'','','werw');
subject.weird(6,'','','foowerw');
subject.weird(6,'',43,'');
subject.weird(6,'',43,'foo"strict"');
subject.weird(6,'',43,"strict");
subject.weird(6,'',43,'werw');
subject.weird(6,'',43,'foowerw');
subject.weird(6,'',41,'');
subject.weird(6,'',41,'foo"strict"');
subject.weird(6,'',41,"strict");
subject.weird(6,'',41,'werw');
subject.weird(6,'',41,'foowerw');
subject.weird(6,1,'','');
subject.weird(6,1,'','foo"strict"');
subject.weird(6,1,'',"strict");
subject.weird(6,1,'','werw');
subject.weird(6,1,'','foowerw');
subject.weird(6,1,43,'');
subject.weird(6,1,43,'foo"strict"');
subject.weird(6,1,43,"strict");
subject.weird(6,1,43,'werw');
subject.weird(6,1,43,'foowerw');
subject.weird(6,1,41,'');
subject.weird(6,1,41,'foo"strict"');
subject.weird(6,1,41,"strict");
subject.weird(6,1,41,'werw');
subject.weird(6,1,41,'foowerw');
subject.weird(6,-1,'','');
subject.weird(6,-1,'','foo"strict"');
subject.weird(6,-1,'',"strict");
subject.weird(6,-1,'','werw');
subject.weird(6,-1,'','foowerw');
subject.weird(6,-1,43,'');
subject.weird(6,-1,43,'foo"strict"');
subject.weird(6,-1,43,"strict");
subject.weird(6,-1,43,'werw');
subject.weird(6,-1,43,'foowerw');
subject.weird(6,-1,41,'');
subject.weird(6,-1,41,'foo"strict"');
subject.weird(6,-1,41,"strict");
subject.weird(6,-1,41,'werw');
subject.weird(6,-1,41,'foowerw');
subject.fileTest('','');
subject.fileTest('','');
subject.fileTest('','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('','path/filenotExist');
mock.restore();
subject.fileTest('','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('','path/filenotExist');
mock.restore();
subject.fileTest('','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('','path/filenotExist');
mock.restore();
subject.fileTest('','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('','path/filenotExist');
mock.restore();
subject.fileTest('','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('','pathContent/file1');
mock.restore();
subject.fileTest('','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('','pathContent/file1');
mock.restore();
subject.fileTest('','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('','pathContent/file2');
mock.restore();
subject.fileTest('','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('','pathContent/file2');
mock.restore();
subject.fileTest('path/fileExists','');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','');
mock.restore();
subject.fileTest('path/fileExists','');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
subject.fileTest('path/fileExists','');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','');
mock.restore();
subject.fileTest('path/fileExists','');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','path/filenotExist');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','path/filenotExist');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file1');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
subject.fileTest('path/fileExists','pathContent/file2');
mock({"path/fileExists":{},"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"pathContent":{"file1":"text content","file2":""}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file2');
mock.restore();
subject.normalize('');
subject.format('','','');
subject.format('','',{"normalize": true});
subject.format('','',{"normalize": false});
subject.format('','','');
subject.blackListNumber('');
