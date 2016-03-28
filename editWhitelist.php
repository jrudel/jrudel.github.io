<?php
header('Access-Control-Allow-Origin: http://webdavserver.com');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL');
header('Access-Control-Allow-Headers: Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If');
header('Access-Control-Expose-Headers: DAV, content-length, Allow');
$whitelist =  $_POST['whitelist'];
echo $whitelist;
