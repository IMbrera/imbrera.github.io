---
published: false
---
## Zabbix docker

docker desktop(install) -> cmd (docker pull centos:8) -> open terminal 
1. cd /etc/yum.repos.d/
2. sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
3. sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
4. yum update -y
