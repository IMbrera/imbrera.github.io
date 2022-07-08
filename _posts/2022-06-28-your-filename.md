---
published: true
layout: post
---
## Zabbix docker

docker desktop(install) -> cmd (docker pull centos:8) -> open terminal 
1. cd /etc/yum.repos.d/
2. sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
3. sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
4. yum update -y
(Если есть ошибка при загрузках)
Установка zabbix в контейнер
step A
1. rpm -Uvh https://repo.zabbix.com/zabbix/6.0/rhel/8/x86_64/zabbix-release-6.0-2.el8.noarch.rpm
2. dnf clean all
step B 
1. dnf install zabbix-server-mysql zabbix-web-mysql zabbix-apache-conf zabbix-sql-scripts zabbix-selinux-policy zabbix-agent 
step C
1.  
