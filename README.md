# sockerDebug
使用Express调试Socket信息

起因是由于Express拒绝了非标准的http协议,所以我增加了www中server的监听信息,去捕获更多的通信级别的信息

# notice
由于增加了相当一部分的调试信息,所以性能会严重下降,所以调试完毕之后,请注释掉调试信息,或者恢复至默认的bin/www文件内容